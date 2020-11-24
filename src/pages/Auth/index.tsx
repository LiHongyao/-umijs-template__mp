import Api from '@/Api';
import Cookie from '@/utils/cookie';
import Utils from '@/utils/utils';
import React, { FC, useEffect } from 'react';
import { history, useParams } from 'umi';

interface RouteParams {
  type: string;
}
interface RouteQuery {
  code: string;
  state: string;
}
interface ILoginResponse {
  token: string;
}

const Auth: FC = () => {
  const { type } = useParams<RouteParams>();
  // methods
  const handleJump = () => {
    let from = Utils.query<string>('from');
    let appid = 'wx169565989539bf7d'; // 替换
    let path = '/auth/callback';
    let redirect_uri = encodeURIComponent(`${window.location.origin}${path}`);
    let state = from ? encodeURIComponent(from) : '';
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    window.location.replace(url);
  };
  const handleCallback = () => {
    // 解析code
    const { code, state } = Utils.query<RouteQuery>();
    // 执行登录逻辑
    Api.wechat
      .login<XXX.BaseResponse<ILoginResponse>>({
        code,
        shareCode: '？？？',
      })
      .then(res => {
        if (res && res.code === 0 && res.data) {
          Cookie.set('XXX_CLIENT_TOKEN', res.data.token);
          // 跳转
          if (state) {
            history.replace(state);
          } else {
            history.replace('/');
          }
        }
      });
  };
  // effects
  useEffect(() => {
    switch (type) {
      case 'jump':
        handleJump();
        break;
      case 'callback':
        handleCallback();
        break;
    }
  }, []);

  // render
  return <></>;
};

export default Auth;
