<template>
    <div>
        <h1>CROC/LOVE - Cybercafés</h1>
        <div :key="index" v-for="(restaurant, index) in restaurants">
            <table>
            <thead>
                <tr>
                    <th> {{ restaurant.name }} </th>
                    <th>{{ restaurant.city }} - {{ restaurant.nbcouverts }} couverts - {{ iSterrasse(restaurant.terrasse) }} - {{ iSparking(restaurant.parking) }}</th>
                    <th><button @click="deleteRestaurant(restaurant.id)">X</button></th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td :rowspan="restaurant.employees.length + 1">Equipe</td>
            </tr>
            <tr :key="index" v-for="(employe, index) in restaurant.employees">
                <td>{{ employe.first_name }} {{ employe.last_name }}</td>
                <td><button @click="deleteEmployee(employe.employee_id)">X</button></td>
            </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
    name: 'RestaurantForm',
    data() {
      return {
        restaurants: null,
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
        iSterrasse(terrasse) {
            return terrasse === 'non' ? 'pas de terrasse' : 'terrasse ✔';
        },
        iSparking(parking) {
            return parking === 'non' ? 'pas de parking' : 'parking ✔';
        },
        deleteEmployee(employeId) {                  
            axios.delete("http://127.0.0.1:5000/restaurants/employes/" + employeId)
            .then(alert("Employé supprimé avec succès"))
            .then(window.location.reload());
        },
        deleteRestaurant(restaurantId) {
            axios.delete("http://127.0.0.1:5000/restaurants/" + restaurantId)
            .then(alert("Restaurant supprimé avec succès"))
            .then(window.location.reload());
        }
    },
}
</script>