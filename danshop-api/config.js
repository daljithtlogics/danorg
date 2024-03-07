const sshTunnelConfig = {
    host: '157.245.36.128',
    port: 22,
    username: 'root',
    // password: 'b9fe0e52b6fa236b36461c8195'
    password: '6b9480761d49eeb8344183a7ad97'
  };
  
  const dbServer = {
    host: 'localhost',
    port: '3306',
    user: 'vendure',
    password: 'Sandeep@0097!@',
    database: 'danshop_latest'
  };

  const emailConfig = {
    service: 'gmail',
    user: process.env.EMAIL_USER || 'surya.ishita.30@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'zrqdsrouhglllraw',
  };
  
  module.exports = {
    sshTunnelConfig,
    dbServer,
    emailConfig,
  };
  