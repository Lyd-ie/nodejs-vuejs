<template>
    <div>
        <h2>Création de restaurant</h2>
        <form @submit.prevent="createRestaurant">
            <label>Nom du restaurant</label>
            <input type="text" @blur="isValid(form.name, $event.target)" maxlength="50" required v-model="form.name">
            <p></p>

            <label>Ville</label>
            <input type="text" @blur="isValid(form.city, $event.target)" maxlength="50" required v-model="form.city">
            <p></p>

            <label>Nombre de couverts</label>
            <input type="number" @blur="isInteger(form.nbcouverts, $event.target)" required v-model="form.nbcouverts">
            <p></p>

            <label>Terrasse</label>
            <input type="radio" value="oui" required v-model="form.terrasse"> OUI
            <input type="radio" value="non" required v-model="form.terrasse"> NON <br>

            <label>Parking</label>
            <input type="radio" value="oui" required v-model="form.parking"> OUI
            <input type="radio" value="non" required v-model="form.parking"> NON

            <input id="restaurantForm" type="submit">
        </form>
  </div>
</template>

<script>
  // Charger la bibliothèque axios
  import axios from "axios"

  export default {
    name: 'RestaurantForm',
    data() {
      return {
        form: {
          name: '',
          city: '',
          nbcouverts: '',
          terrasse: '',
          parking: ''
        }
      }
    },
    methods: {
      createRestaurant() {
        axios.post("http://127.0.0.1:5000/restaurant", this.form)
        .then(() => {
          alert("Restaurant créé avec succès");
          window.location.reload();
        })
        .catch(error => {
          console.log(this.form);
          console.error("Erreur lors de la création du restaurant :", error);
        });
      },
      isValid(input, inputElement) {
        const pattern = /^[A-Za-zÀ-ÿ0-9' -]+$/;
        const errorField = inputElement.nextElementSibling;
        const bouton = document.getElementById("restaurantForm");
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
      },
      isInteger(input, inputElement) {
        const errorField = inputElement.nextElementSibling;
        const bouton = document.getElementById("restaurantForm");
        if (!Number.isInteger(Number(input))) {
          errorField.innerHTML = "Entrez un nombre entier";
          bouton.disabled = true;
          return false;
        } else {
          errorField.innerHTML = "";
          bouton.disabled = false;
        }
      }
    },
  }
</script>