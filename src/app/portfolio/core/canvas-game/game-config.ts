/**
 * Game configuration constants
 */
export const GAME_CONFIG = {
  // Visual (reduced visibility for subtle background effect)
  WORD_OPACITY: 0.25,
  BULLET_OPACITY: 0.40,
  FRAGMENT_OPACITY: 0.25,
  ROCKET_OPACITY: 0.50,
  
  // Theme colors (red-black theme)
  COLOR_RED: '#ef4444',      // red-500 (theme accent)
  COLOR_RED_DARK: '#dc2626', // red-600 (theme accent hover)
  COLOR_WHITE: '#f3f4f6',     // gray-100 (theme text primary)
  COLOR_GRAY: '#e5e7eb',     // gray-200 (theme text secondary)
  COLOR_GRAY_LIGHT: '#d1d5db', // gray-300 (theme text tertiary)
  
  // Font
  FONT_FAMILY: 'monospace',
  WORD_FONT_SIZE: 18, // Larger for better visibility
  
  // Desktop mode limits
  MAX_BULLETS: 12,
  MAX_WORDS_DESKTOP: 18,
  MAX_FRAGMENTS: 30,
  
  // Mobile mode limits
  MAX_WORDS_MOBILE: 8,
  
  // Physics
  WORD_FALL_SPEED: 30, // pixels per second (slightly faster for more noticeable movement)
  WORD_HORIZONTAL_DRIFT: 8, // pixels per second variance
  BULLET_SPEED: 400, // pixels per second
  FRAGMENT_SPEED: 60, // pixels per second
  FRAGMENT_LIFETIME: 600, // milliseconds
  
  // Input
  FIRE_RATE_LIMIT: 150, // milliseconds between shots
  
  // Collision
  WORD_COLLISION_RADIUS: 25,
  BULLET_RADIUS: 2,
  
  // Spawn
  WORD_SPAWN_INTERVAL: 2000, // milliseconds
  WORD_SPAWN_Y_OFFSET: -30, // spawn above viewport
} as const;

/**
 * Programming tokens for falling words
 * Includes: Core Java, languages, terminal commands, Kubernetes, etc.
 */
export const PROGRAMMING_TOKENS = [
  // Core Java Keywords
  'class', 'interface', 'abstract', 'final', 'static', 'public', 'private', 'protected',
  'extends', 'implements', 'super', 'this', 'new', 'instanceof', 'synchronized', 'volatile',
  'transient', 'native', 'strictfp', 'package', 'import', 'throws', 'throw', 'try', 'catch',
  'finally', 'if', 'else', 'switch', 'case', 'default', 'for', 'while', 'do', 'break',
  'continue', 'return', 'void', 'int', 'long', 'double', 'float', 'char', 'byte', 'short',
  'boolean', 'String', 'Object', 'null', 'true', 'false',
  
  // Languages & Frameworks
  'Java', 'JavaScript', 'TypeScript', 'Python', 'Kotlin', 'Scala', 'Groovy', 'C++', 'C#',
  'Go', 'Rust', 'Swift', 'Dart', 'PHP', 'Ruby', 'Perl', 'R', 'MATLAB',
  'React', 'Angular', 'Vue', 'Svelte', 'Next', 'Nuxt', 'Express', 'Spring', 'Hibernate',
  'JPA', 'JUnit', 'Mockito', 'Maven', 'Gradle', 'Ant',
  
  // Terminal Commands
  'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'find', 'chmod', 'chown',
  'ps', 'kill', 'top', 'htop', 'df', 'du', 'tar', 'zip', 'unzip', 'git', 'npm', 'yarn',
  'docker', 'kubectl', 'helm', 'terraform', 'ansible', 'curl', 'wget', 'ssh', 'scp',
  'sudo', 'su', 'apt', 'yum', 'brew', 'pip', 'conda',
  
  // Kubernetes & DevOps
  'Kubernetes', 'k8s', 'pod', 'deployment', 'service', 'ingress', 'configmap', 'secret',
  'namespace', 'node', 'cluster', 'helm', 'kubectl', 'minikube', 'docker', 'container',
  'image', 'registry', 'CI', 'CD', 'Jenkins', 'GitLab', 'GitHub', 'Actions', 'pipeline',
  'terraform', 'ansible', 'prometheus', 'grafana', 'ELK', 'kibana',
  
  // Database & Data
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'Elasticsearch', 'Oracle',
  'DB2', 'SQLite', 'Neo4j', 'DynamoDB', 'CosmosDB', 'HBase', 'CouchDB',
  
  // Cloud & Infrastructure
  'AWS', 'EC2', 'S3', 'Lambda', 'DynamoDB', 'RDS', 'VPC', 'CloudFormation', 'CloudWatch',
  'Azure', 'GCP', 'Google', 'Cloud', 'Firebase', 'Heroku', 'Netlify', 'Vercel',
  
  // Web Technologies
  'HTML', 'CSS', 'SASS', 'SCSS', 'LESS', 'Bootstrap', 'Tailwind', 'Webpack', 'Vite',
  'REST', 'GraphQL', 'gRPC', 'WebSocket', 'HTTP', 'HTTPS', 'TCP', 'IP', 'DNS',
  
  // General Programming
  'function', 'method', 'variable', 'constant', 'array', 'list', 'map', 'set', 'queue',
  'stack', 'tree', 'graph', 'algorithm', 'data structure', 'OOP', 'functional', 'async',
  'await', 'promise', 'callback', 'closure', 'recursion', 'iteration', 'loop'
] as const;

