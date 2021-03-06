<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="date"
          :color="baseColor"
        >
          <v-text-field
            :color="baseColor"
            slot="activator"
            label="Picker in menu"
            v-model="date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="date"
            no-title scrollable
            :color="baseColor"
            event-color="green"
            :events="registerDates">
            <v-spacer></v-spacer>
            <v-btn flat :color="baseColor" @click="menu = false">Cancel</v-btn>
            <v-btn flat :color="baseColor" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-spacer />
      <v-flex xs3 sm3>
        <v-btn flat icon :color="baseColor"
         @click="toNextWeek">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toLastWeek">
          <v-icon>keyboard_arrow_down</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
         @click="toYesterday">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn flat icon :color="baseColor"
          @click="toTomorrow">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <p class="display-2">YATTAKOTO</p>
        <v-select
          label="YATTAKOTO"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="ywtYattakoto"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeKeep(data.item)"
              :selected="data.selected"
              :color="ywtColor.yattakoto"
              text-color="white"
            >
              <v-avatar :color="ywtColor.yattakotoAvatar">Y</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">WAKATTAKOTO</p>
        <v-select
          label="WAKATTAKOTO"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="ywtWakattakoto"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeProblem(data.item)"
              :selected="data.selected"
              :color="ywtColor.wakattakoto"
              text-color="white"
            >
              <v-avatar :color="ywtColor.wakattakotoAvatar">W</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 md4>
        <p class="display-2">TSUGINIYARUKOTO</p>
        <v-select
          label="TSUGINIYARUKOTO"
          chips
          tags
          solo
          prepend-icon=""
          append-icon=""
          v-model="ywtTsuginiyarukoto"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              close
              @input="removeTry(data.item)"
              :selected="data.selected"
              :color="ywtColor.tsuginiyarukoto"
              text-color="white"
            >
              <v-avatar :color="ywtColor.tsuginiyarukotoAvatar">T</v-avatar>
              <strong>{{ data.item }}</strong>
            </v-chip>
          </template>
        </v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menu: false,
      date: undefined,
      registerDates: undefined
    }
  },
  computed: {
    ...mapGetters({
      baseColor: 'color/baseColor',
      ywtColor: 'color/ywtColor',
      ywt: 'ywt/ywt'
    }),
    ywtYattakoto: {
      get () {
        return this.getEachYwt('yattakoto')
      },
      set (list) {
        this.setEachYwt('ywt/setYattakoto', list)
      }
    },
    ywtWakattakoto: {
      get () {
        return this.getEachYwt('wakattakoto')
      },
      set (list) {
        this.setEachYwt('ywt/setWakattakoto', list)
      }
    },
    ywtTsuginiyarukoto: {
      get () {
        return this.getEachYwt('tsuginiyarukoto')
      },
      set (list) {
        this.setEachYwt('ywt/setTsuginiyarukoto', list)
      }
    }
  },
  watch: {
    date (next, prev) {
      if (!this.hasDate(next)) {
        this.setNewYwt(next)
      }
    }
  },
  mounted () {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    this.setRegisterDates()
  },
  methods: {
    removeEachYwt (ywtWord, item) {
      this.$store.commit(ywtWord, { date: this.date, item })
    },
    removeKeep (item) {
      this.removeEachYwt('ywt/removeYattakoto', item)
    },
    removeProblem (item) {
      this.removeEachYwt('ywt/removeWakattakoto', item)
    },
    removeTry (item) {
      this.removeEachYwt('ywt/removeTsuginiyarukoto', item)
    },
    hasDate (date) {
      if (date in this.ywt) {
        return true
      } else {
        return false
      }
    },
    getEachYwt (ywtWord) {
      if (this.hasDate(this.date)) {
        return this.ywt[this.date][ywtWord]
      }
    },
    setEachYwt (mutationWord, list) {
      if (this.hasDate(this.date)) {
        this.$store.commit(mutationWord, { date: this.date, list })
      } else {
        this.setNewYwt(this.date)
        this.$store.commit(mutationWord, { date: this.date, list })
      }
    },
    setNewYwt (date) {
      this.$store.commit('ywt/setYwt', {
        date,
        content: { yattakoto: [], wakattakoto: [], tsuginiyarukoto: [] }
      })
      this.setRegisterDates()
    },
    setRegisterDates () {
      this.registerDates = Object.keys(this.ywt)
    },
    toTomorrow () {
      this.toNextDay(1)
    },
    toYesterday () {
      this.toNextDay(-1)
    },
    toNextWeek () {
      this.toNextDay(7)
    },
    toLastWeek () {
      this.toNextDay(-7)
    },
    toNextDay (direction) {
      const date = new Date(this.date)
      date.setDate(date.getDate() + direction)
      this.date = date.toJSON().slice(0, 10).replace(/-/g, '-')
    }
  }
}
</script>
