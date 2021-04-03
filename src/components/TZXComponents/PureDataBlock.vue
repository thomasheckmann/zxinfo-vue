<template>
  <v-card class="ma-0 pa-0">
    <v-app-bar dark dense flat
      ><v-toolbar-title>ID: 0x{{ value.id.toString(16) }} - PureDataBlock</v-toolbar-title> <v-spacer></v-spacer
      ><v-btn icon :disabled="editMode" @click="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn></v-app-bar
    >
    <v-form :ref="`form_${id}`" class="pa-2" :disabled="!editMode" @submit.prevent>
      <v-container
        ><v-row align="center" justify="center"
          ><v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.zeroLen"
              :rules="rules.zeroLen"
              label="Length of ZERO bit pulse"
              required
              autocomplete="off"
            >
            </v-text-field> </v-col></v-row
        ><v-row
          ><v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.oneLen"
              :rules="rules.oneLen"
              label="Length of ONE bit pulse"
              required
              autocomplete="off"
            >
            </v-text-field></v-col></v-row
        ><v-row
          ><v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.pause"
              :rules="rules.pause"
              label="Pause after this block (ms.)"
              required
              autocomplete="off"
            >
            </v-text-field></v-col></v-row
        ><v-row
          ><v-col>
            <v-btn small :disabled="!(editMode && isDirty)" @click="submit" class="mr-4">
              save
            </v-btn>
            <v-btn small :disabled="!editMode" @click="resetForm"> cancel </v-btn></v-col
          ></v-row
        ></v-container
      ></v-form
    >
  </v-card>
</template>
<script>
export default {
  name: "PureDataBlockView",
  props: ["value"],
  data() {
    var defaultForm = Object({
      zeroLen: this.value.zeroLen,
      oneLen: this.value.oneLen,
      pause: this.value.pause,
    });
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      rules: {
        zeroLen: [(val) => (val >= 0 && val < 65536) || `Must be a number between 0 and 65535`],
        oneLen: [(val) => (val >= 0 && val < 65536) || `Must be a number between 0 and 65535`],
        pause: [(val) => (val >= 0 && val < 65536) || `Must be a number between 0 and 65535`],
      },
      editMode: false,
      isDirty: false,
      id: null,
    };
  },
  watch: {
    "form.zeroLen": function(val) {
      if (parseInt(val) !== parseInt(this.defaultForm.zeroLen)) this.isDirty = true;
      else this.isDirty = false;
    },
    "form.oneLen": function(val) {
      if (parseInt(val) !== parseInt(this.defaultForm.oneLen)) this.isDirty = true;
      else this.isDirty = false;
    },
    "form.pause": function(val) {
      if (parseInt(val) !== parseInt(this.defaultForm.pause)) this.isDirty = true;
      else this.isDirty = false;
    },
  },
  methods: {
    edit() {
      this.editMode = true;
      this.form = Object.assign({}, this.defaultForm);
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.editMode = false;
      this.isDirty = false;
    },
    submit() {
      this.editMode = false;
      this.isDirty = false;
      this.value.zeroLen = this.form.zeroLen;
      this.value.oneLen = this.form.oneLen;
      this.value.pause = this.form.pause;
    },
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {},
};
</script>
