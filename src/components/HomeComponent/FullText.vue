<template>
  <div class="full-text">
    <mavonEditor
      v-model="handbook"
      :editable="false"
      :toolbarsFlag="false"
      :subfield="false"
      defaultOpen="preview"
    />
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import { getMdVal } from "@/assets/api/index";
import { toggleLeftSiderMixin } from "@/common/toggleLeftSiderMixin";
import "mavon-editor/dist/css/index.css";
export default {
  name: "FullText",
  data() {
    return {
      handbook: "",
    };
  },
  mixins: [toggleLeftSiderMixin],
  created() {
    this.getmd(this.$route.query.id);
  },
  methods: {
    async getmd(val) {
      const { data } = await getMdVal(val);
      this.handbook = data;
    },
  },
  components: {
    mavonEditor,
  },
};
</script>

<style lang="scss" scoped>
.full-text {
  overflow-y: scroll;
}
</style>