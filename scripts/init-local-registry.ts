import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const LOCAL_REGISTRY_FILE = path.join(
  ROOT_DIR,
  'src',
  'core',
  'registry',
  'projects-registry.local.generated.ts'
);

export function ensureLocalRegistryFile(): void {
  if (!fs.existsSync(LOCAL_REGISTRY_FILE)) {
    const content = `// AUTO-GENERATED FILE. LOCAL / PRIVATE PROJECTS REGISTRY.
// This file is gitignored and will not be tracked.
import type { RegisteredProject } from './project-contract';

export const localProjects: RegisteredProject[] = [];
`;
    fs.mkdirSync(path.dirname(LOCAL_REGISTRY_FILE), { recursive: true });
    fs.writeFileSync(LOCAL_REGISTRY_FILE, content, 'utf-8');
    console.log('🔒 Arquivo local de registro inicializado em projects-registry.local.generated.ts');
  }
}

// Execução direta via CLI / postinstall
ensureLocalRegistryFile();
