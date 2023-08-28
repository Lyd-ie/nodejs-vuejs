<template>
  <div id="app">
    <Roster/>
    <div class="forms">
      <EmployeeForm class="form"/>
      <RestaurantForm class="form"/>
    </div>
  </div>
</template>

<script>
import Roster from './components/Roster.vue';
import RestaurantForm from './components/RestaurantForm.vue';
import EmployeeForm from './components/EmployeeForm.vue'

export default {
  name: 'App',
  components: {
    Roster,
    RestaurantForm,
    EmployeeForm
  }
}
</script>

<style>
  body { font-family: calibri } 
  table, tr, td, th, tbody { border: 1px solid black; border-collapse: collapse; }
  table { margin-bottom: 20px }
  tr, td, th { padding: 5px; } 
  input, select { display: block; margin-bottom: 10px }
  input[type="radio"] { display: inline-block }
  .forms { display: flex }
  .form { margin: 30px }
</style>
