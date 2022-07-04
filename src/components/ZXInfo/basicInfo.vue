<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr :style="!$isDevelopment ? 'display: none;' : ''">
          <td>{{ entry.contentType }}</td>
          <td>{{ entry.zxinfoVersion }}</td>
        </tr>
        <tr>
          <td class="font-weight-bold" width="33%">Title</td>
          <td>
            <v-badge v-if="entry.availability == 'MIA'" color="pink" dot overlap> {{ entry.title }} </v-badge
            ><span v-else>{{ entry.title }}</span>
          </td>
        </tr>
        <tr :style="!$isDevelopment && !entry.alsoKnownAs ? 'display: none;' : ''">
          <td :class="entry.alsoKnownAs ? 'font-weight-bold' : 'font-weight-light'">Also known as</td>
          <td style="white-space: normal;">{{ entry.alsoKnownAs }}</td>
        </tr>
        <tr :style="!$isDevelopment && !entry.availability ? 'display: none;' : ''">
          <td :class="entry.availability ? 'font-weight-bold' : 'font-weight-light'">Availability / Publication</td>
          <td style="white-space: normal;">
            <router-link :to="{ path: '/search', query: { availability: entry.availability } }">{{
              entry.availability
            }}</router-link>
            <span v-if="entry.originalPublication"
              >/
              <router-link :to="{ path: '/search', query: { originalpublication: entry.originalPublication } }">{{
                entry.originalPublication
              }}</router-link></span
            >
          </td>
        </tr>
        <tr :style="!entry.originalYearOfRelease && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.originalYearOfRelease ? 'font-weight-bold' : 'font-weight-light'">Original Release Year</td>
          <td valign="top">
            <router-link :to="{ path: '/search', query: { year: entry.originalYearOfRelease } }">{{
              entry.originalYearOfRelease
            }}</router-link>
          </td>
        </tr>
        <tr :style="!entry.originalPublishers && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.originalPublishers ? 'font-weight-bold' : 'font-weight-light'">Original Publisher(s)</td>
          <td valign="top">
            <v-list flat dense class="pa-0">
              <v-list-item
                style="min-height:16px;"
                class="pa-0 ma-0 auto"
                v-for="(publisher, i) in entry.originalPublishers"
                :key="i"
              >
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle style="white-space: normal;"
                    ><router-link :to="{ path: '/publisher/' + encodeURIComponent(publisher.name) }">{{
                      publisher.name
                    }}</router-link
                    ><span v-if="publisher.country"> ({{ publisher.country }})</span>
                    <span v-if="publisher.labelType"> - {{ publisher.labelType }}</span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.originalPriceAmount && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.originalPriceAmount ? 'font-weight-bold' : 'font-weight-light'">Original Price</td>
          <td><span v-if="entry.originalPricePrefix">{{ entry.originalPriceCurrency }}{{ entry.originalPriceAmount }}</span>
          <span v-if="!entry.originalPricePrefix">{{ entry.originalPriceAmount }} {{ entry.originalPriceCurrency }}</span></td>
        </tr>
        <tr :style="!entry.authors.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.authors.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Author(s)</td>
          <td valign="top">
            <v-list flat dense class="pa-0">
              <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(author, i) in entry.authors" :key="i">
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle style="white-space: normal;"
                    ><router-link :to="{ path: '/author/' + encodeURIComponent(author.name) }">{{ author.name }}</router-link
                    ><span v-if="author.country"> ({{ author.country }})</span
                    ><span v-if="author.labelType"> - {{ author.labelType }}</span>
                    <span v-if="author.group"
                      >, team:
                      <router-link v-if="author.group" :to="{ path: '/author/' + encodeURIComponent(author.group) }">
                        {{ author.group }}</router-link
                      ></span
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.contributors.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.contributors.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Contributor(s)</td>
          <td valign="top">
            <v-list flat dense class="pa-0">
              <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(author, i) in entry.contributors" :key="i">
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle style="white-space: normal;"
                    ><router-link :to="{ path: '/author/' + encodeURIComponent(author.name) }">{{ author.name }}</router-link
                    ><span v-if="author.country"> ({{ author.country }})</span
                    ><span v-if="author.labelType"> - {{ author.labelType }}</span>
                    <router-link v-if="author.group" :to="{ path: '/author/' + encodeURIComponent(author.group) }">
                      [{{ author.group }}]</router-link
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!Object.keys(entry.roles).length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="Object.keys(entry.roles).length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Roles</td>
          <td valign="top">
            <v-list flat dense class="pa-0">
              <v-list-item
                style="min-height:16px;"
                class="pa-0 ma-0 auto"
                v-for="(author, i) in Object.keys(entry.roles)"
                :key="i"
              >
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle style="white-space: normal; color: black;"
                    ><b>{{ author }} : </b>
                    <span v-for="(role, r) in entry.roles[author].roles" :key="r"
                      >{{ role.roleName }}<span v-if="r != entry.roles[author].roles.length - 1">, </span></span
                    ></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.messageLanguage && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.messageLanguage ? 'font-weight-bold' : 'font-weight-light'">Message Language</td>
          <td valign="top">{{ entry.messageLanguage }}</td>
        </tr>
        <tr :style="!entry.machineType && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.machineType ? 'font-weight-bold' : 'font-weight-light'">Machine Type</td>
          <td>
            <router-link :to="{ path: '/search', query: { machinetype: entry.machineType } }">{{
              entry.machineType
            }}</router-link>
          </td>
        </tr>
        <tr :style="!entry.isbn && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.isbn ? 'font-weight-bold' : 'font-weight-light'">ISBN</td>
          <td>
            {{ entry.isbn }}
          </td>
        </tr>
        <tr :style="entry.genre == '-/-' && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.genre != '-/-' ? 'font-weight-bold' : 'font-weight-light'">Genre</td>
          <td>
            <router-link :to="{ path: '/search', query: { genretype: entry.genreType } }">{{ entry.genre }}</router-link>
          </td>
        </tr>
        <tr :style="!entry.maximumPlayers && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.maximumPlayers ? 'font-weight-bold' : 'font-weight-light'">Maximum Players</td>
          <td valign="top">{{ entry.maximumPlayers }}</td>
        </tr>
        <tr :style="!entry.multiTurnMode && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.multiTurnMode ? 'font-weight-bold' : 'font-weight-light'">Multi-Turn Mode</td>
          <td valign="top">
            <router-link :to="{ path: '/search', query: { multiplayermode: entry.multiTurnMode } }">{{
              entry.multiTurnMode
            }}</router-link>
          </td>
        </tr>
        <tr :style="!entry.multiTurnType && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.multiTurnType ? 'font-weight-bold' : 'font-weight-light'">Multi-Turn Type</td>
          <td valign="top">
            <router-link :to="{ path: '/search', query: { multiplayertype: entry.multiTurnType } }">{{
              entry.multiTurnType
            }}</router-link>
          </td>
        </tr>
        <tr :style="!entry.controlOptions.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.controlOptions.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
            Control Options
          </td>
          <td>
            <v-list flat dense class="pa-0">
              <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(control, i) in entry.controlOptions" :key="i">
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle
                    ><router-link :to="{ path: '/search', query: { control: control } }">{{
                      control
                    }}</router-link></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.comments && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.comments ? 'font-weight-bold' : 'font-weight-light'" valign="top">Comments</td>
          <td class="wrap-text"><span v-html="entry.comments"></span></td>
        </tr>
        <tr :style="!entry.hardwareBlurb && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.hardwareBlurb ? 'font-weight-bold' : 'font-weight-light'" valign="top">Summary</td>
          <td class="wrap-text"><span v-html="entry.hardwareBlurb"></span></td>
        </tr>
        <tr :style="!entry.knownErrors && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.knownErrors ? 'font-weight-bold' : 'font-weight-light'" valign="top">Known errors</td>
          <td class="wrap-text"><span v-html="entry.knownErrors"></span></td>
        </tr>
        <tr :style="!entry.awards.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.awards.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
            Awards
          </td>
          <td>
            <v-list flat dense class="pa-0">
              <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(text, i) in entry.awards" :key="i">
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.reviewAwards.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.reviewAwards.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">
            Review awards
          </td>
          <td>
            <v-list flat dense class="pa-0">
              <v-list-item style="min-height:16px;" class="pa-0 ma-0 auto" v-for="(item, i) in entry.reviewAwards" :key="i">
                <v-list-item-content class="py-1">
                  <v-list-item-subtitle
                    >{{ item.awardName }} -
                    <router-link :to="{ path: '/magazines/' + item.magazineName }">{{ item.magazineName }}</router-link
                    >&nbsp;
                    <router-link :to="{ path: '/magazines/' + item.magazineName + '/issues/' + item.issueId }"
                      >issue #{{ item.number }} - {{ item.dateYear }}/{{ item.dateMonth }}</router-link
                    >, page {{ item.page }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </td>
        </tr>
        <tr :style="!entry.allinlays.length && !$isDevelopment ? 'display: none;' : ''">
          <td :class="entry.allinlays.length ? 'font-weight-bold' : 'font-weight-light'" valign="top">Inlays</td>
          <td></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: "BasicInfoView",
  props: ["entry"],
  methods: {
    openUrl: function(url) {
      window.open(url);
    },
  },
  components: {},
  computed: {},
};
</script>
<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
