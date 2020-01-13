var ObsClient = require('../huawei-obs/obs');

/*
 * Initialize a obs client instance with your account for accessing OBS
 */
module.exports = new ObsClient({
  access_key_id: 'MVOABMVMWDH4FNQF46HL',
  secret_access_key: 'FngCx9dfPNjNV4Gh5TAid4Wy3vLPBstzVfN3zv8G',
  server : 'https://obs.cn-north-4.myhuaweicloud.com'
});
