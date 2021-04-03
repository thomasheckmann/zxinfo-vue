<template>
  <v-card class="ma-0 pa-0">
    <v-app-bar dark dense flat
      ><v-toolbar-title>ID: 0x{{ value.id.toString(16) }} - PulseSequence</v-toolbar-title> <v-spacer></v-spacer
      ><v-btn icon :disabled="editMode" @click="edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn></v-app-bar
    >
    <v-form :ref="`form_${id}`" class="pa-2" :disabled="!editMode" @submit.prevent>
      <v-container class="ma-0 pa-0" fluid
        ><v-row align="center" justify="center"
          ><v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.pulseCount"
              :rules="rules.pulseCount"
              label="Number of pulses"
              required
              autocomplete="off"
            >
            </v-text-field> </v-col></v-row
        ><v-row
          ><v-col>
            <v-text-field
              :disabled="!editMode"
              v-model="form.pulseLen"
              :rules="rules.pulseLen"
              label="Pulses' lengths"
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
  name: "PulseSequenceView",
  props: ["value"],
  data() {
    var defaultForm = Object({
      pulseCount: this.value.pulseCount,
      pulseLen: this.value.pulseLen,
    });
    return {
      form: Object.assign({}, defaultForm),
      defaultForm,
      rules: {
        pulseCount: [(val) => (val >= 0 && val < 256) || `Must be a number between 0 and 255`],
        pulseLen: [(val) => (val >= 0 && val < 65536) || `Must be a number between 0 and 65535`],
      },
      editMode: false,
      isDirty: false,
      id: null,
    };
  },
  watch: {
    "form.pulseCount": function(val) {
      if (parseInt(val) !== parseInt(this.defaultForm.pulseCount)) this.isDirty = true;
      else this.isDirty = false;
    },
    "form.pulseLen": function(val) {
      if (parseInt(val) !== parseInt(this.defaultForm.pulseLen)) this.isDirty = true;
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
      this.value.pulseCount = this.form.pulseCount;
      this.value.pulseLen = this.form.pulseLen;
    },
  },
  mounted() {
    this.id = this._uid;
  },
  computed: {},
};
</script>
