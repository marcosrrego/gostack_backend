# RECUPERAÇÃO DE SENHA

**RF** (requisitos funcionais)

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** (requisitos não funcionais)

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento. Miltrap seria um servico de envio de email fake, só para testes;
- Utilizar o amazon SES para envios em produção. amazon SIMPLE EMAIL SERVICE, é um sistema para envio de e-mail em produção;
- O envio de email-s deve acontecer em segundo plano (background job), por fila;

**RN** (regras de negócio)

- O link enviado por e-mail para resetar senha deve expirar em 2H;
- O usuário precisar confirmar a nova senha ao resetar sua senha;

# ATUALIZAÇÃO DO PERFIL

**RF** (requisitos funcionais)

- O usuário deve poder atualizar seu perfil: nome, e-mail e/ou senha;

**RN** (regras de negócio)

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualziar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha, o usuário deve confirmar a nova senha;


# PAINEL DO PRESTADOR

**RF** (requisitos funcionais)

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as norificações não lidas;

**RNF** (requisitos não funcionais)

- Os agendamentos do prestador no dia deve ser armazenado em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando o Socket.IO;

**RN** (regras de negócio)

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# AGENDAMENTO DE SERVIÇOS

**RF** (requisitos funcionais)

- O usuário deve poder listar todos os prestadores de serviço cadastrados na plataforma;
- O usuário deve poder listar os dias de um mês com os horarios disponiveis ou pelo menos um horario disponivel de um prestador;
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** (requisitos não funcionais)

- A listagem de prestadores deve ser armazenada em cache;


**RN** (regras de negócio)

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis em 8h às 18h (primeiro às 8h e o último as 19h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviço consigo mesmo;
