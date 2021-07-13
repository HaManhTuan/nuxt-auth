import Vue from 'vue'
Vue.filter('filterGender', (val) => {
  if (val === '1') {
    return 'male'
  } else {
    if (val === '2') {
      return 'female'
    } else {
      return 'other genders'
    }
  }
})
