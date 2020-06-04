import { Vue } from 'vue-property-decorator';

export type VForm = Vue & { validate: (args?) => boolean };
