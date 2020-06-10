<template>
  <div class="dashboard-container">
    <v-container fluid>
      <v-row>
        <v-col class="col-12 col-sm-3">
          <summary-data title='Summary 1' value='$1,000.00' icon='mdi-cash-usd' />
        </v-col>
        <v-col class="col-12 col-sm-3">
          <summary-data title='Summary 2' value='2,000' icon='mdi-account' />
        </v-col>
        <v-col class="col-12 col-sm-3">
          <summary-data title='Summary 3' value='80.5%' icon='mdi-poll-box' />
        </v-col>
        <v-col class="col-12 col-sm-3">
          <summary-data title='Summary 4' value='$2,000.00' icon='mdi-currency-usd' />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-12 col-sm-8">
          <chart-data />
        </v-col>
        <v-col class="col-12 col-sm-4">
          <pie-data />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script src="./dashboard.script.tsx" lang="ts"></script>
<style src="./dashboard.style.scss" lang="scss" scoped></style>
