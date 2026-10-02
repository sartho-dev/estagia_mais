Documento de Requisitos de Software (SRS)
Sistema: Plataforma de Vagas de Estágio
Versão: 2.0 — 01/10/2026

1. Introdução
   1.1 Objetivo
   Este documento especifica os requisitos do sistema de vagas de estágio, detalhando funcionalidades, regras de negócio, restrições e modelo de dados, servindo como guia para o desenvolvimento e a validação do software.
   1.2 Escopo
   O sistema permitirá que estudantes encontrem vagas de estágio e se candidatem a elas, que responsáveis cadastrem suas empresas, publiquem vagas e conduzam o processo seletivo, e que um administrador mantenha cursos e modalidades. O sistema também registrará as matrículas dos estudantes em cursos.
   1.3 Definições e Siglas
   • DER: Diagrama Entidade-Relacionamento.
   • PK: Primary Key (Chave Primária).
   • FK: Foreign Key (Chave Estrangeira).
   • UUID: Identificador Universal Único, usado como chave primária de todas as entidades.
   • LGPD: Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
   • Estudante: usuário que busca vagas e se candidata a elas.
   • Responsável: usuário que acessa o sistema em nome de uma empresa.
   • Empresa: organização cadastrada que publica vagas por meio de seus responsáveis; não acessa o sistema diretamente.
   • Administrador: usuário interno que mantém cursos, modalidades e contas.
2. Descrição Geral
   2.1 Perfis de Usuário (Atores)
   • Estudante: pode se cadastrar, gerenciar seus dados, registrar matrículas em cursos e se candidatar a vagas.
   • Responsável: cadastra a empresa, publica e gerencia vagas e avalia as candidaturas recebidas.
   • Administrador: gerencia cursos, modalidades e contas de usuários.
   2.2 Premissas e Dependências
   • Os estudantes devem informar um CPF válido para se cadastrar.
   • As empresas devem informar um CNPJ válido.
   • CPF e CNPJ são atributos únicos, mas não são usados como chave primária.
   • O sistema dependerá de um banco de dados relacional (PostgreSQL) para garantir a integridade das informações.
3. Requisitos Funcionais (RF)
   Cada requisito indica sua prioridade: Essencial, Importante ou Desejável.
   Acesso ao Sistema
   • RF01 - Autenticação: O sistema deve permitir que estudantes, responsáveis e administradores entrem com e-mail e senha, saiam da sessão e recuperem a senha por meio de link enviado ao e-mail. (Prioridade: Essencial)
   • RF02 - Controle de Acesso: Cada usuário deve acessar apenas as funcionalidades do seu perfil. (Prioridade: Essencial)
   Módulo do Estudante
   • RF03 - Cadastro de Estudante: O sistema deve permitir o cadastro de estudantes com os dados: ID (UUID), CPF, Nome, E-mail, Senha, Data de Nascimento e um ou mais Telefones. O cadastro exige o aceite dos termos de uso e da política de privacidade. (Prioridade: Essencial)
   • RF04 - Edição de Perfil: O estudante pode alterar nome, e-mail, telefones e senha. O CPF só pode ser corrigido pelo administrador. (Prioridade: Importante)
   • RF05 - Matrícula em Curso: O estudante pode se matricular em um ou mais cursos. A matrícula deve registrar: Data de Início, Data Fim (opcional enquanto ativa), Semestre e Situação. (Prioridade: Essencial)
   • RF06 - Busca de Vagas: O sistema deve permitir que estudantes busquem vagas abertas por curso, modalidade, carga horária ou palavra-chave. (Prioridade: Essencial)
   • RF07 - Candidatura a Vaga: O estudante pode se candidatar a várias vagas. A candidatura deve registrar a Data da Candidatura e iniciar com a situação "Em análise". (Prioridade: Essencial)
   • RF08 - Cancelamento de Candidatura: O estudante pode cancelar uma candidatura enquanto ela estiver "Em análise" ou "Entrevista". (Prioridade: Importante)
   • RF09 - Acompanhamento: O estudante pode visualizar a situação de suas candidaturas e matrículas. (Prioridade: Essencial)
   • RF10 - Exclusão de Conta: O estudante pode solicitar a exclusão de seus dados pessoais, conforme a LGPD. (Prioridade: Importante)
   Módulo da Empresa e do Responsável
   • RF11 - Cadastro de Empresa e Responsável: O primeiro responsável cadastra a empresa, com ID (UUID), CNPJ, Nome Fantasia, Razão Social, E-mail e um ou mais Telefones, e a própria conta, com ID (UUID), Nome, E-mail, Senha e um ou mais Telefones. (Prioridade: Essencial)
   • RF12 - Inclusão de Responsáveis: Um responsável pode convidar, por e-mail, outros responsáveis da mesma empresa. (Prioridade: Importante)
   • RF13 - Edição da Empresa: Os responsáveis podem alterar os dados da empresa, exceto o CNPJ. (Prioridade: Importante)
   • RF14 - Publicação de Vaga: A empresa pode publicar várias vagas. A vaga deve conter: ID (UUID), Título, Descrição, Data de Publicação (gerada pelo sistema), Prazo de Candidatura, Modalidade, Carga Horária semanal e o Curso alvo. (Prioridade: Essencial)
   • RF15 - Edição e Encerramento de Vaga: O responsável pode editar uma vaga ou encerrá-la antes do prazo. (Prioridade: Essencial)
   • RF16 - Gestão de Candidaturas: O responsável pode visualizar os estudantes candidatados às vagas da sua empresa e atualizar a situação de cada candidatura. (Prioridade: Essencial)
   • RF17 - Notificação: O estudante deve receber um e-mail quando a situação de uma candidatura mudar. (Prioridade: Desejável)
   Módulo Administrativo
   • RF18 - Gestão de Cursos: O administrador pode cadastrar, editar e desativar cursos, com ID (UUID) e Nome. (Prioridade: Essencial)
   • RF19 - Gestão de Modalidades: O administrador mantém a lista de modalidades (Presencial, Remoto e Híbrido). (Prioridade: Importante)
   • RF20 - Gestão de Contas: O administrador pode desativar contas de estudantes, responsáveis e empresas. (Prioridade: Importante)
4. Requisitos Não Funcionais (RNF)
   • RNF01 - Segurança: As senhas devem ser armazenadas com hash bcrypt (custo mínimo 12) ou Argon2id, nunca em texto puro.
   • RNF02 - Comunicação Segura: Toda a comunicação deve usar HTTPS (TLS 1.2 ou superior), e as sessões devem expirar após 60 minutos sem uso.
   • RNF03 - Privacidade: O sistema deve estar em conformidade com a LGPD: coletar consentimento no cadastro, atender pedidos de exclusão em até 15 dias e exibir o CPF mascarado fora do perfil do próprio estudante.
   • RNF04 - Desempenho: A busca por vagas deve retornar resultados em até 3 segundos em 95% das requisições, considerando 10.000 vagas cadastradas e 100 usuários simultâneos.
   • RNF05 - Usabilidade: A interface deve ser responsiva e utilizável em telas de 360 px a 1920 px de largura.
   • RNF06 - Acessibilidade: A interface deve seguir as diretrizes WCAG 2.1, nível AA.
   • RNF07 - Disponibilidade: O sistema deve estar disponível 99% do tempo, medido mensalmente (no máximo cerca de 7 horas de indisponibilidade por mês), exceto manutenções programadas.
   • RNF08 - Integridade de Dados: Todas as chaves estrangeiras devem ter restrição no banco. Cursos, vagas e empresas com registros vinculados não podem ser excluídos fisicamente, apenas desativados (soft delete).
   • RNF09 - Identificadores: Todas as chaves primárias devem ser do tipo UUID, geradas pelo sistema.
   • RNF10 - Auditoria: Toda mudança de situação de uma candidatura deve registrar quem a fez, com data e hora.
5. Regras de Negócio (RN)
   • RN01: Um estudante pode se candidatar a várias vagas, e uma vaga pode receber candidaturas de vários estudantes (relacionamento N:N - candidata).
   • RN02: Um estudante pode ter várias matrículas, e um curso pode ter vários estudantes matriculados (relacionamento N:N - matricula).
   • RN03: Um curso pode ter várias vagas, mas uma vaga pertence a apenas um curso (relacionamento 1:N - possui).
   • RN04: Uma empresa pode publicar várias vagas, mas uma vaga pertence a apenas uma empresa (relacionamento 1:N - publica).
   • RN05: Uma empresa pode ter um ou mais responsáveis, mas cada responsável pertence a apenas uma empresa (relacionamento 1:N - possui).
   • RN06: O CPF do estudante, o CNPJ da empresa e o e-mail de qualquer usuário devem ser únicos no sistema.
   • RN07: Um estudante não pode se candidatar mais de uma vez à mesma vaga, nem mesmo após cancelar a candidatura.
   • RN08: Um estudante não pode ter duas matrículas ativas no mesmo curso.
   • RN09: A data de fim da matrícula, quando informada, não pode ser anterior à data de início, e fica vazia enquanto a matrícula estiver ativa.
   • RN10: O prazo de candidatura da vaga não pode ser anterior à data de publicação.
   • RN11: Uma candidatura só pode ser feita até o fim do prazo de candidatura e enquanto a vaga estiver aberta.
   • RN12: Só pode se candidatar a uma vaga o estudante com matrícula ativa no curso alvo dessa vaga.
   • RN13: Um responsável só pode visualizar e alterar vagas e candidaturas da própria empresa.
   • RN14: Uma empresa deve ter sempre pelo menos um responsável ativo.
   • RN15: A situação da matrícula pode ser: Ativa, Trancada, Concluída ou Cancelada. Uma matrícula ativa pode passar a trancada, concluída ou cancelada; uma trancada pode voltar a ativa ou ser cancelada. Concluída e cancelada são situações finais.
   • RN16: A situação da candidatura pode ser: Em análise, Entrevista, Aprovada, Rejeitada ou Cancelada. De "Em análise" pode ir para Entrevista, Rejeitada ou Cancelada; de "Entrevista" pode ir para Aprovada, Rejeitada ou Cancelada. Aprovada, Rejeitada e Cancelada são finais. Apenas o estudante pode cancelar; as demais mudanças são feitas pelo responsável.
   • RN17: A situação da vaga pode ser Aberta ou Encerrada. A vaga é encerrada manualmente pelo responsável ou automaticamente ao fim do prazo.
6. Modelo de Dados
   Todas as entidades utilizam um identificador do tipo UUID como chave primária. CPF e CNPJ passam a ser atributos únicos, o que permite corrigi-los sem afetar outras tabelas e evita que esses dados pessoais se espalhem como chave estrangeira, em linha com a LGPD. Os telefones, multivalorados no DER, são armazenados em tabelas próprias.
   6.1 Alterações em relação ao DER da versão 1.0
   • Estudante: a chave primária passa de CPF para ID (UUID); o CPF torna-se único; inclusão do atributo senha.
   • Empresa: a chave primária passa de CNPJ para ID (UUID); o CNPJ torna-se único.
   • Responsável: inclusão do atributo senha e da chave estrangeira para a empresa.
   • Inclusão das entidades Administrador e Modalidade.
   • Vaga: inclusão do atributo situação; a modalidade passa a ser chave estrangeira.
   • Matrícula e Candidatura: passam a ter ID (UUID) próprio, com as restrições de unicidade descritas nas regras de negócio.
   6.2 Entidades
   • Estudante: id (PK), cpf (único), nome, email (único), senha_hash, data_nasc, ativo, criado_em.
   • Telefone do Estudante: id (PK), estudante_id (FK), numero.
   • Empresa: id (PK), cnpj (único), nome_fantasia, razao_social, email, ativo, criado_em.
   • Telefone da Empresa: id (PK), empresa_id (FK), numero.
   • Responsável: id (PK), empresa_id (FK), nome, email (único), senha_hash, ativo, criado_em.
   • Telefone do Responsável: id (PK), responsavel_id (FK), numero.
   • Administrador: id (PK), nome, email (único), senha_hash.
   • Curso: id (PK), nome (único), ativo.
   • Modalidade: id (PK), nome (único).
   • Matrícula: id (PK), estudante_id (FK), curso_id (FK), data_inicio, data_fim, semestre, situacao.
   • Vaga: id (PK), empresa_id (FK), curso_id (FK), modalidade_id (FK), titulo, descricao, data_publi, prazo_candidatura, carga_horaria, situacao.
   • Candidatura: id (PK), estudante_id (FK), vaga_id (FK), data_candidatura, situacao; o par estudante_id e vaga_id é único.
   • Histórico da Candidatura: id (PK), candidatura_id (FK), situacao_anterior, situacao_nova, alterado_por, alterado_em.
   Todos os campos id e de chave estrangeira são do tipo UUID.
7. Histórias de Usuário
   • Como estudante, quero me cadastrar com meu CPF, e-mail e senha para poder me candidatar a vagas.
   ◦ Critérios de aceitação: CPF inválido ou já cadastrado é recusado; e-mail repetido é recusado; sem o aceite da política de privacidade o cadastro não é concluído.
   • Como estudante, quero filtrar vagas pelo meu curso e modalidade para encontrar oportunidades relevantes.
   ◦ Critérios de aceitação: só aparecem vagas abertas e dentro do prazo; os filtros podem ser combinados; o resultado aparece em até 3 segundos.
   • Como estudante, quero me candidatar a uma vaga do meu curso.
   ◦ Critérios de aceitação: a candidatura é bloqueada sem matrícula ativa no curso alvo; uma segunda candidatura à mesma vaga é recusada; a candidatura inicia como "Em análise".
   • Como estudante, quero cancelar uma candidatura para desistir do processo.
   ◦ Critérios de aceitação: só é possível nas situações "Em análise" ou "Entrevista"; depois de cancelar, não é possível se candidatar de novo à mesma vaga.
   • Como responsável, quero cadastrar minha empresa para que ela possa publicar vagas.
   ◦ Critérios de aceitação: CNPJ inválido ou já cadastrado é recusado; o responsável fica vinculado à empresa criada.
   • Como responsável, quero publicar uma vaga informando a carga horária e a modalidade para atrair estagiários compatíveis.
   ◦ Critérios de aceitação: prazo anterior à data de publicação é recusado; curso alvo e modalidade são obrigatórios; a vaga inicia como "Aberta".
   • Como responsável, quero ver a lista de candidatos e mudar a situação para "Entrevista" para gerenciar meu processo seletivo.
   ◦ Critérios de aceitação: só aparecem vagas da própria empresa; mudanças de situação não permitidas são recusadas; cada mudança fica registrada no histórico.
   • Como administrador, quero cadastrar cursos para que vagas e matrículas possam ser vinculadas a eles.
   ◦ Critérios de aceitação: nome de curso repetido é recusado; curso com vínculos só pode ser desativado.
8. Histórico de Versões
   • Versão 1.0: versão inicial do documento.
   • Versão 2.0 (01/10/2026): adoção de UUID como chave primária de todas as entidades, com CPF e CNPJ como atributos únicos; cardinalidade entre responsável e empresa alinhada ao DER; inclusão de autenticação, administrador, modalidade e telefones multivalorados; definição das situações possíveis e suas transições; novas regras de negócio e requisitos funcionais; requisitos não funcionais mensuráveis; critérios de aceitação nas histórias de usuário.
