function normalizeModules(modules = [], aliases = {}) {
  const aliasNames = Object.keys(aliases);

  const replaceAlias = (file) => {
    const alias = aliasNames.find(alias => file.startsWith(alias));
    
    if (alias) {
      return file.replace(alias, aliases[alias]);
    }

    return file;
  }

  return modules.map(({ file, deps }) => {
    return {
      file: replaceAlias(file),
      deps: deps.map(replaceAlias),
    }
  })  
}

function treeshakeModules({ modules, aliases, absoluteRepoPath, entrypoints}) {
  const absoluteModules = normalizeModules(modules, {
    ...aliases,
    '.': absoluteRepoPath
  });
  
  const usedModules = new Set();
  const stack = [...entrypoints];

  const withoutUsed = (module) => !usedModules.has(module.file || module);

  while (stack.length) {
    const file = stack.pop();
    const module = absoluteModules.find(module => module.file === file);
    usedModules.add(module.file);


    const deps = module.deps.filter(withoutUsed);
    stack.push(...deps);
  }

  return absoluteModules.filter(withoutUsed).map(module => module.file);
}


module.exports = treeshakeModules;

export default treeshakeModules
