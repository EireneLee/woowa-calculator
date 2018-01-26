import Woowahan from 'woowahan';
import DefaultLayout from './views/layout/default';
import * as views from './views';

global.$ = global.jQuery = Woowahan.$;

const app = new Woowahan();
const routeConfig = [{
  url: '/', 
  view: views.Main, 
  container: '.contents', 
  layout: 'DefaultLayout'
},
{
  url: '/calculator',
  view: views.Calculator,
  container: '#app',
},
{
  url: '/calculator/:cal_result', //:path_name (path variable)
  view: views.Calculator,
  container: '#app',
}];

app.start(routeConfig);

app.use(Woowahan.Layout('#app', DefaultLayout));

app.on('start', function() {
  console.log('app start');
});
