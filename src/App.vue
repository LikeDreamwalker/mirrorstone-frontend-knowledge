<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list rounded>
        <v-list-item
          @click="
            drawer = !drawer;
            tempTitle = '镜石';
            getMarkDown(entryFile.readme.url);
          "
          :input-value="tempTitle === '镜石' ? true : false"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>镜石</v-list-item-title>
        </v-list-item>

        <v-list-item
          @click="
            dark = !dark;
            $vuetify.theme.dark = dark;
          "
        >
          <v-list-item-icon>
            <v-icon>
              {{ dark ? "mdi-brightness-4" : "mdi-brightness-7" }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ dark ? "夜间模式" : "日间模式" }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item href="https://ldwid.com">
          <v-list-item-icon>
            <v-icon> </v-icon>
          </v-list-item-icon>
          <v-list-item-title> 访问 ldwid.com </v-list-item-title>
        </v-list-item>

        <v-list-item
          href="https://github.com/LikeDreamwalker/mirrorstone-frontend-knowledge"
        >
          <v-list-item-icon>
            <v-icon> </v-icon>
          </v-list-item-icon>
          <v-list-item-title> 访问 镜石 </v-list-item-title>
        </v-list-item>

        <v-list-group
          sub-group
          v-for="item in entryFile.files"
          :key="item.name"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon class="mr-1">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </template>

          <v-list-item
            v-for="md in item.mds"
            :key="md.title"
            :input-value="md.title === tempTitle ? true : false"
            link
            @click="
              getMarkDown(md.url);
              drawer = !drawer;
              tempTitle = md.title;
            "
          >
            <v-list-item-title v-text="md.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-fab-transition>
      <v-btn
        v-show="!drawer"
        color="primary"
        dark
        fixed
        bottom
        right
        fab
        @click="drawer = !drawer"
        x-large
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-main>
      <v-container fluid>
        <mavon-editor
          v-if="!loading"
          v-model="value"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          style="z-index: 0; border: 0px"
          :style="dark ? 'color: #FFFFFF' : 'color: #000000DE'"
          :previewBackground="dark ? '#121212' : '#FFFFFF'"
          :box-shadow="false"
          :ishljs="true"
          :codeStyle="dark ? 'atom-one-dark' : 'atom-one-light'"
        >
        </mavon-editor>
        <v-card
          v-if="loading"
          elevation="0"
          flat
          tile
          width="100vw"
          height="100vh"
          class="d-flex align-center justify-center"
        >
          <v-progress-circular
            indeterminate
            color="primary"
            size="200"
            width="2"
          >
            MirrorStone
          </v-progress-circular>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    entryFile: "",
    drawer: false,
    group: null,
    value: "",
    url: "",
    readme: "",
    dark: false,
    loading: false,
    tempTitle: "镜石"
  }),

  created() {
    this.loading = true;
    (async () => {
      await this.axios
        .get(
          "https://ldwid-1258491808.cos.ap-beijing.myqcloud.com/mirrorstone/entry.json"
        )
        .then((response) => {
          this.entryFile = response.data;
        });
      this.axios.get(this.entryFile.readme.url).then((response) => {
        this.value = response.data;
        this.readme = response.data;
        this.loading = false;
      });
    })();
  },

  watch: {
    dark() {
      this.setDarkElement();
    }
  },

  methods: {
    async getMarkDown(url) {
      this.loading = true;
      await this.axios.get(url).then((response) => {
        this.value = response.data;
        this.loading = false;
      });
      this.setDarkElement();
    },
    setDarkElement() {
      this.changeBG("pre");
      this.changeBG("th");
      this.changeBG("td");
    },
    changeBG(element) {
      let elementArray = document.getElementsByTagName(element);
      elementArray.forEach((item) => {
        if (this.dark) {
          item.style.backgroundColor = "#121212";
        } else {
          item.style.backgroundColor = "#ffffff";
        }
      });
    }
  }
};
</script>

<style lang="scss">
</style>
