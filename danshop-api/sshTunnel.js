const { Client } = require('ssh2');

function createSshTunnel(sshTunnelConfig, dbServer) {
  return new Promise((resolve, reject) => {
    const sshClient = new Client();
    sshClient.on('ready', () => {
      sshClient.forwardOut(
        '127.0.0.1',
        3306,
        dbServer.host,
        dbServer.port,
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(stream);
        }
      );
    }).connect(sshTunnelConfig);
  });
}

module.exports = createSshTunnel;
