module.exports = {
  disableEmoji: true,
  list: ['test', 'feat', 'fix', 'docs', 'refactor', 'style', 'release'],
  maxMessageLength: 80,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body'],
  scopes: [],
  types: {
    docs: {
      description: 'Documentation changes',
      value: 'docs',
    },
    feat: {
      description: 'Create new feature / enhance changes',
      value: 'enc',
    },
    fix: {
      description: 'A fixing bugs changes',
      value: 'fix',
    },
    refactor: {
      description: 'Code fixes a minor bug or adds a feature also improve code',
      value: 'refactor',
    },
    release: {
      description: 'Create release commit',
      value: 'release',
    },
    style: {
      description: 'Create / edit style, white-space, formatting,',
      value: 'style',
    },
    test: {
      description: 'Create test & coverage',
      value: 'test',
    },
  },
};
