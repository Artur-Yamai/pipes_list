<template>
<div class="fade">
  <form class="add-pipe">
    <div class="add-pipe__header">
      <p class="add-pipe__close"
      ><span class="add-pipe__close-span" @click="closeWondow">&#10006;</span>
      </p>
    </div>

    <div class="add-pipe__block">
      <p class="add-pipe__text">Наименование</p>
      <input 
        type="text" class="add-pipe__input"
        required
        v-model.trim="pipeData.name"  
      >
    </div>

    <div class="add-pipe__block">
      <p class="add-pipe__text">диаметр трубы, мм</p>
      <input 
        type="text" class="add-pipe__input"
        v-model.trim="pipeData.diameter"  
      >
    </div>

    <div class="add-pipe__block">
      <p class="add-pipe__text">толщина стенки трубы, мм</p>
      <input 
        type="text" class="add-pipe__input"
        v-model.trim="pipeData.thickness"
      >
    </div>

    <!-- состояние трубы -->
    <div class="add-pipe__block">
      <p class="add-pipe__text">состояние трубы</p>
      <select 
        class="add-pipe__input"
        v-model="state"
      >
        <option
          v-for="elem in $store.getters.getStates"
          :key="elem.id"
          class="details__elem"
        >{{elem.value}}</option>
      </select>
    </div>

    <!-- назначение трубы -->
    <div class="add-pipe__block">
      <p class="add-pipe__text">назначение трубы</p>
      <select
        class="add-pipe__input"
        v-model="purpose"
      >
        <option
          v-for="elem in $store.getters.getPurpouses"
          :key="elem.id"
          class="details__elem"
        >{{elem.value}}</option>
      </select>
    </div>

    <div class="add-pipe__block">
      <p class="add-pipe__text add-pipe__date">дата установки трубы</p>
      <input 
        type="date" class="add-pipe__input" 
        v-model="pipeData.formationDate">
    </div>
    
    <button class="add-pipe__button btn btn__green"
            @click.prevent="dataRetrieval"
    >Готово</button>
    <p
      class="add-pipe__error"
      v-if="inputError"
    >Есть неправильно заполненные поля</p>
  </form>

</div>
</template>

<script>
import helpers from '../helpers.js'

export default {  
  props: {
    oldPipeData: Object
  },

  data() {
    return {
      pipeData: {
        name: '',
        formationDate: '',
        diameter: '',
        thickness: '',
        purposeId: '',
        stateId: '',
        id: ''
      },

      state: '',
      purpose: '',

      inputError: false
    }
  },


  methods: {

    closeWondow() {
      this.$emit('hidePopup');
    },

    dataRetrieval() {
      let pipe = this.pipeData;

      // сравнение на корректность даты
      let isDateCorrect = helpers.existingDate(pipe.formationDate);

      // проверка на корректность данных
      if (pipe.name.length < 2 || +pipe.diameter <= 0 || +pipe.thickness <= 0 || !isDateCorrect || !this.state.length || !this.purpose.length) {
        this.inputError = true;
        return false
      }

      pipe.stateId = this.$store.getters.getTheStateByValue(this.state) 
      pipe.purposeId = this.$store.getters.getThePurpousByValue(this.purpose)

      this.$emit('dataRetrieval', pipe);
    }

  },

  mounted() {
    if(this.oldPipeData) {
      // this.pipeData = this.oldPipeData;

      for (let elem in this.pipeData) {
        this.pipeData[elem] = this.oldPipeData[elem]
      }

      this.state = this.$store.getters.getTheStateById(this.pipeData.stateId).value;
      this.purpose = this.$store.getters.getThePurpousById(this.pipeData.purposeId).value;
    }
  }
  
}
</script>

<style lang="scss">

.fade {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.add-pipe {
  width: 350px;
  margin: 80px auto 0;
  padding: 16px 50px;
  background-color: rgb(37, 201, 255);
  border-radius: 8px;
  z-index: 5;

  &__close {
    color: white;
    text-align: end;

    &-span {
      cursor: pointer;
    }
  }

  &__block {
    text-align: center;
    color: white;
    margin-bottom: 5px;
  }

  &__text {
    color: white;
    font-size: 1.1em;
  }

  &__input {
    width: 100%;
    padding: 3px 5px;
    border-radius: 3px;
  }

  &__button {
    display: block;
    margin: 16px auto;
  }

  &__error {
    color: rgb(255, 99, 99);
    text-align: center;
    margin: 0px 0 0;
    font-size: 0.8em;
  }
}
</style>
