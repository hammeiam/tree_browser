function nullify() { return null; }

require.extensions['.css'] = nullify;
require.extensions['.less'] = nullify;

// https://gist.github.com/daviferreira/1503ce0532abca270b86