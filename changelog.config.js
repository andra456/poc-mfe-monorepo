module.exports = {
  disableEmoji: true,
  list: ['test', 'feat', 'fix', 'docs', 'refactor', 'style', 'release'],
  maxMessageLength: 85,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body'],
  scopes: [],
  types: {
    docs: {
      description: 'Documentation changes',
      value: 'docs',
      emoji: '',
    },
    feat: {
      description: 'Create new feature / enhance changes',
      value: 'enc',
      emoji: '',
    },
    fix: {
      description: 'A fixing bugs changes',
      value: 'fix',
      emoji: '',
    },
    refactor: {
      description: 'Code fixes a minor bug or adds a feature also improve code',
      value: 'refactor',
      emoji: '',
    },
    release: {
      description: 'Create release commit',
      value: 'release',
      emoji: '',
    },
    style: {
      description: 'Create / edit style, white-space, formatting,',
      value: 'style',
      emoji: '',
    },
    test: {
      description: 'Create test & coverage',
      value: 'test',
      emoji: '',
    },
  },
};
