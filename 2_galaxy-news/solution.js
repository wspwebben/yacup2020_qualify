function filterMessage(message) {
  const regex = /^([A-Z]{2,8}-\d{2,8})\/([A-Z][A-Z\-]+[A-Z])\/([A-Z]+):\{(.*)\}$/;
  const found = message.match(regex);
  if (!found) return false;

  const [match, galaxy, system, planet] = found;

  if (system.includes('--')) return false;
  if (planet.includes('UNDEFINED')) return false;

  return true;
}

function updateFake(fullMessage) {
  const [address, message] = fullMessage.split(':');
  const messageParts = message.split('@');
  const noFakeMessage = messageParts.reduce((msg, part, index) => {
    return `${msg}<${index % 2 ? '' : '/'}fake>${part}`;
  })

  return `${address}:${noFakeMessage}`;
}

function checkMessages(messages) {
  const correctMessages = messages.filter(filterMessage);

  return correctMessages.map(updateFake);
}

module.exports = checkMessages;

export default checkMessages
