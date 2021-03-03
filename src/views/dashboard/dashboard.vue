<template>
	<div class="dashboard-container">
		<v-container fluid>
			<v-row>
				<v-col class="col-12 col-sm-3">
					<summary-data title="Summary 1" value="$1,000.00" icon="mdi-cash-usd" />
				</v-col>
				<v-col class="col-12 col-sm-3">
					<summary-data title="Summary 2" value="2,000" icon="mdi-account" />
				</v-col>
				<v-col class="col-12 col-sm-3">
					<summary-data title="Summary 3" value="80.5%" icon="mdi-poll-box" />
				</v-col>
				<v-col class="col-12 col-sm-3">
					<summary-data title="Summary 4" value="$2,000.00" icon="mdi-currency-usd" />
				</v-col>
			</v-row>
			<v-row>
				<v-col class="col-12 col-sm-8">
					<div class="chart-data-container">
						<v-card class="mx-auto" outlined>
							<v-card-title class="text-center">Chart Data</v-card-title>
							<v-divider></v-divider>
							<chart-data />
							<v-divider></v-divider>
							<v-card-actions>
								<v-col class="text-right pa-0">
									<v-btn text color="indigo">View More <v-icon text>mdi-arrow-right</v-icon></v-btn>
								</v-col>
							</v-card-actions>
						</v-card>
					</div>
				</v-col>
				<v-col class="col-12 col-sm-4">
					<div class="pie-data-container">
						<v-card class="mx-auto" outlined>
							<v-card-title class="text-center">Pie Data</v-card-title>
							<v-divider></v-divider>
							<pie-data />
							<v-divider></v-divider>
							<v-card-actions>
								<v-col class="text-right pa-0">
									<v-btn text color="indigo">View More <v-icon text>mdi-arrow-right</v-icon></v-btn>
								</v-col>
							</v-card-actions>
						</v-card>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script src="./dashboard.script.ts" lang="ts"></script>
<style src="./dashboard.style.scss" lang="scss" scoped></style>
