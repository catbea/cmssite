export default {
  env: 'production',
  global: { // 全局对象
    'production': {
      client_id: 2885352224564774,
      login_url: 'https://usercenter.aijiatui.com/user-center-h5/#/uLogin'
    },
    'test': {
      client_id: 5131239438556591,
      login_url: 'https://test-user-center.aijiatui.com/user-center-h5/#/uLogin'
    },
    'wei': {
      client_id: 5439489331026556,
      login_url: 'https://wei-user-center.aijiatui.com/user-center-h5/#/uLogin'
    },
    'dev': {
      client_id: 5439489331026556,
      login_url: 'https://dev-user-center.aijiatui.com/user-center-h5/#/uLogin'
    }
  }
}