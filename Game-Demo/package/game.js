console.log('独立分包加载成功');

  wx.loadSubpackage({
    name: '__GAME__',
    success: () => {
      console.log('====loadSubpackage 主包 success');
    },
    fail: err => console.log(err)
  }).onProgressUpdate((res) => {
      console.log('====progress', res);
      // loadingFn(res.progress);
  });