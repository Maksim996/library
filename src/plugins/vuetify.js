import Vue from 'vue';
import "@mdi/font/css/materialdesignicons.min.css";
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import uk from 'vuetify/src/locale/uk.ts';

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
      },
      lang: {
        locales: { uk },
        current: 'uk',
      },
});
