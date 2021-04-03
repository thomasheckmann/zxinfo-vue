<template>
  <v-card class="ma-0 pa-0">
    <v-app-bar dark dense flat
      ><v-toolbar-title>ID: 0x{{ value.id.toString(16) }} - StandardSpeedDataBlock</v-toolbar-title> <v-spacer></v-spacer
      ><v-btn icon :disabled="editMode" @click="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn></v-app-bar
    >
    <v-form :ref="`form_${id}`" class="pa-2" :disabled="!editMode" @submit.prevent>
      <v-container class="ma-0 pa-0" fluid
        ><v-row>
          <v-col align="left">
            <div class="text-subtitle-2" v-if="value.data[0] === 0 && value.blockType === 'Header'">
              Program: {{ String.fromCharCode.apply(null, value.data.slice(1, 11)) }}<br />
              Length: {{ value.data[11] + value.data[12] * 256 }}<br />
              Auto start: {{ value.data[13] + value.data[14] * 256 }}<br />
              Program length: {{ value.data[15] + value.data[16] * 256 }}
            </div>
            <div class="text-subtitle-2" v-if="value.data[0] === 3 && value.blockType === 'Header'">
              Bytes: {{ String.fromCharCode.apply(null, value.data.slice(1, 11)) }}<br />
              Length: {{ value.data[11] + value.data[12] * 256 }}<br />
              Start address: {{ value.data[13] + value.data[14] * 256 }}<br />
            </div> </v-col></v-row
        ><v-row>
          <v-col> <v-text-field disabled="" label="Length" :value="value.length"> </v-text-field></v-col></v-row
        ><v-row>
          <v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.pause"
              :rules="rules.pause"
              label="Pause"
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
  name: "StandardSpeedDataBlockView",
  props: ["value"],
  data() {
    var defaultForm = Object({
      pause: this.value.pause,
    });
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      rules: {
        pause: [(val) => val >= 0 || `Must be a number!`],
      },
      editMode: false,
      isDirty: false,
      id: null,
    };
  },
  watch: {
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
      this.value.pause = this.form.pause;
    },
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {},
};
</script>
