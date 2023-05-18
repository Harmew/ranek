/**
 *  @Description: Mapeia os campos de um objeto para o state do vuex
 *
 *  @Param {String} options.base - Nome do módulo do vuex
 *  @Param {Array} options.fields - Campos que serão mapeados
 *  @Param {String} options.mutation - Nome da mutation que será chamada
 *
 *  @Exemple  mapFields({ base: 'user', fields: ['nome', 'email'], mutation: 'SET_USER' })
 *
 * @Return Object -- Exemple { nome: { get(), set() }, email: { get(), set() } } */

export default function mapFields(options) {
  const obj = {};
  for (let x = 0; x < options.fields.length; x++) {
    const field = options.fields[x];
    obj[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return obj;
}
