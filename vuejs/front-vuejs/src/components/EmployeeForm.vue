<template>
  <div>
    <h2>Embauche d'employé</h2> 
    <form @submit.prevent="createEmployee">
      <label>Prénom de l'employé</label>
      <input type="text" @blur="isValid(form.first_name, $event.target)" maxlength="25" required v-model="form.first_name">
      <p></p>

      <label>Nom de l'employé</label>
      <input type="text" @blur="isValid(form.last_name, $event.target)" maxlength="25" required v-model="form.last_name">
      <p></p>

      <label>Date d'embauche</label>
      <input type="date" required v-model="form.hire_date">

      <label>Restaurant</label>
      <select required v-model="form.restaurant_id">
          <option :key="index" v-for="(restaurant, index) in restaurants" :value="restaurant.id">{{ restaurant.name }}</option>
      </select>

      <input id="employeeForm" type="submit">
    </form>
  </div>
</template>

<script>
import axios from "axios"

  export default {
    name: 'EmployeeForm',
    data() {
      return {
        restaurants: null,
        form: {
          first_name: '',
          last_name: '',
          hire_date: '',
          restaurant_id: ''
        }
      }
    },
    mounted() {
      axios.get("http://127.0.0.1:5000/restaurants")
      .then(res => {
        console.log(res.data);
        this.restaurants = res.data;
      })
    },
    methods: {
      createEmployee() {
        axios.post("http://127.0.0.1:5000/employe", this.form)
        .then(() => {
          alert("Employé créé avec succès");
          window.location.reload();
        })
        .catch(error => {
          console.log(this.form);
          console.error("Erreur lors de la création de l'employé :", error);
        });
      },
      isValid(input, inputElement) {
        const pattern = /^[A-Za-zÀ-ÿ' -]+$/;
        const errorField = inputElement.nextElementSibling;
        const bouton = document.getElementById("employeeForm");
        
        if (!pattern.test(input)) {
          errorField.innerHTML = "Please enter a valid name with allowed characters.";
          bouton.disabled = true;
          return false;
        } else {
          errorField.innerHTML = "";
          bouton.disabled = false;
        }

        if (input.length < 3) {
          errorField.innerHTML = "3 caractères minimum";
          bouton.disabled = true;
          return false;
        } else {
          errorField.innerHTML = "";
          bouton.disabled = false;
        }

        return true;
      }
    },

}
</script>