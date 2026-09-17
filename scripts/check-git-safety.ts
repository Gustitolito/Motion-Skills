import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

function getTrackedFiles(): string[] {
  try {
    const output = execSync('git ls-files', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    return output
      .split('\n')
      .map((f) => f.trim().replace(/\\/g, '/'))
      .filter(Boolean);
  } catch {
    // Se o git não estiver inicializado ou falhar, retorna vazio
    return [];
  }
}

function getStagedFiles(): string[] {
  try {
    const output = execSync('git diff --cached --name-only', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return output
      .split('\n')
      .map((f) => f.trim().replace(/\\/g, '/'))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function checkGitSafety(): void {
  console.log('🛡️  Executando verificação de segurança do Git (Git Safety Check)...');

  const trackedFiles = getTrackedFiles();
  const stagedFiles = getStagedFiles();
  const allAuditedFiles = Array.from(new Set([...trackedFiles, ...stagedFiles]));

  if (allAuditedFiles.length === 0) {
    console.log('ℹ️  Nenhum arquivo rastreado ou em stage no Git no momento.');
    return;
  }

  const violations: string[] = [];

  for (const file of allAuditedFiles) {
    const normalized = file.toLowerCase();

    // 1. Arquivos .env proibidos (exceto .env.example)
    if (
      (normalized === '.env' || normalized.startsWith('.env.')) &&
      normalized !== '.env.example'
    ) {
      violations.push(`Arquivo de ambiente não permitido rastreado: ${file}`);
    }

    // 2. Projetos privados ou locais
    if (
      normalized.includes('projects/_private/') ||
      normalized.includes('projects/_local/') ||
      normalized.includes('public/projects/_private/') ||
      normalized.includes('public/projects/_local/')
    ) {
      violations.push(`Conteúdo de projeto privado rastreado no Git: ${file}`);
    }

    // 3. Pastas pesadas / raw media / exports locais
    if (
      normalized.includes('/raw/') ||
      normalized.includes('/generated/') ||
      normalized.includes('/exports/')
    ) {
      violations.push(`Mídia pesada/não-versionável rastreada em pasta reservada: ${file}`);
    }

    // 4. Renders ou saídas de vídeo
    if (normalized.startsWith('out/')) {
      violations.push(`Arquivo de saída/render rastreado no Git: ${file}`);
    }

    // 5. Credenciais conhecidas
    if (
      normalized.endsWith('.pem') ||
      normalized.endsWith('.key') ||
      normalized.endsWith('.pfx') ||
      normalized.endsWith('.p12') ||
      normalized.includes('id_rsa') ||
      normalized.includes('service-account')
    ) {
      violations.push(`Possível credencial/chave criptográfica rastreada: ${file}`);
    }

    // 6. Arquivos grandes (> 25MB)
    const absolutePath = path.join(process.cwd(), file);
    if (fs.existsSync(absolutePath)) {
      try {
        const stats = fs.statSync(absolutePath);
        if (stats.size > MAX_FILE_SIZE_BYTES) {
          const mb = (stats.size / (1024 * 1024)).toFixed(2);
          violations.push(
            `Arquivo excessivamente pesado (${mb} MB) rastreado no Git: ${file}. Use Git LFS ou armazene fora do repositório.`
          );
        }
      } catch {
        // Ignora se não conseguir ler stat
      }
    }
  }

  if (violations.length > 0) {
    console.error('\n🚨 FALHA DE SEGURANÇA NO GIT DETECTADA:');
    violations.forEach((v) => console.error(`  ❌ ${v}`));
    console.error('\nRemova esses arquivos do rastreamento com "git rm --cached <arquivo>"');
    console.error('e garanta que eles estejam cobertos pelas regras do .gitignore.\n');
    process.exit(1);
  }

  console.log('✅ Git Safety Check: Nenhum arquivo confidencial, render pesado ou projeto privado está rastreado no Git.\n');
}

checkGitSafety();
