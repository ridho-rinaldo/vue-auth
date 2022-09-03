<template>
  <div v-if="auth">
    <div class="container">
      <form @submit.prevent="updateData" style="width: 40em">
        <div class="row">
          <div class="col-12">
            <h1 class="h3 mb-4 fw-normal">Data Diri Anda</h1>
          </div>

          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.username"
                type="text"
                class="form-control"
                placeholder="Nama Lengkap"
              />
              <label for="floatingInput">Nama Lengkap</label>
            </div>
          </div>
          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.email"
                type="email"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email</label>
            </div>
          </div>

          <div class="col-5" style="padding-bottom: 1em">
            <select
              v-model="data.gender"
              class="form-select form-select-md"
              style="height: 100%"
            >
              <option selected>Jenis Kelamin</option>
              <option value="Laki - Laki">Laki - Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div class="col-7">
            <div class="form-floating gap">
              <input
                v-model="data.password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>

          <div class="col-5">
            <div class="form-floating gap">
              <input
                v-model="data.phone"
                type="text"
                class="form-control"
                placeholder="No Handphone"
              />
              <label for="floatingInput">No Handphone</label>
            </div>
          </div>

          <div class="col-12">
            <div class="form-floating gap">
              <textarea
                v-model="data.address"
                type="text"
                class="form-control"
                placeholder="Alamat"
                style="min-height: 6em"
              />
              <label for="floatingInput">Alamat</label>
            </div>
          </div>

          <div class="col-4">
            <button class="w-100 btn-lg primary cust-btn" type="submit">
              Simpan Data
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div v-if="!auth" class="center">
    <h4>Silahkan Login atau Daftar terlebih dahulu</h4>
    <div>
      <img :src="mySVG" />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span style="font-size: 1.5em">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Sukses -->
  <div
    class="modal fade"
    id="successModal"
    tabindex="-1"
    aria-labelledby="successModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalLabel">Informasi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body center">Update Data Sukses</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Gagal -->
  <div
    class="modal fade"
    id="failedModal"
    tabindex="-1"
    aria-labelledby="failedModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="failedModalLabel">Informasi</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body center">Update Data Gagal</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from "../components/Footer.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import { reactive, computed } from "vue";

export default {
  name: "app",
  components: { Footer },
  setup() {
    const data = reactive({
      username: "",
      email: "",
      password: "",
      gender: "Jenis Kelamin",
      phone: "",
      address: "",
    });

    const store = useStore();
    const auth = computed(() => store.state.authenticated);

    onMounted(async () => {
      try {
        const _fetch = await fetch("http://localhost:4000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const response = await _fetch.json();

        if (response.status === 200 && response.message === "Sukses") {
          data.username = response.data.username;
          data.email = response.data.Email;
          data.gender = response.data.gender;
          data.phone = response.data.phone;
          data.address = response.data.address;

          await store.dispatch("setAuth", true);
          await store.dispatch("setUser", response.data);
        }

        document
          .getElementById("staticBackdrop")
          ?.addEventListener("shown.bs.modal", () => {
            console.log("first");
          });
      } catch (error) {
        await store.dispatch("setAuth", false);
      }
    });

    const openSuccess = () => {
      const myModal = new Modal(document.getElementById("successModal"), {});
      myModal.show();
    };

    const openFailed = () => {
      const myModal = new Modal(document.getElementById("failedModal"), {});
      myModal.show();
    };

    const updateData = async () => {
      let postData = data;
      let jeniskelamin = postData.gender;

      if (jeniskelamin === "Jenis Kelamin") {
        jeniskelamin = null;
      }

      postData.gender = jeniskelamin;

      const myModal = new Modal(document.getElementById("staticBackdrop"), {});
      myModal.show();

      const _fetch = await fetch("http://localhost:4000/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(postData),
      });

      myModal.hide();
      const response = await _fetch.json();

      if (response.status === 201 && response.message === "Update Sukses") {
        openSuccess();
        setTimeout(async () => {
          await store.dispatch("setUser", response.data);
        }, 100);
      } else {
        openFailed();
      }
    };

    return {
      data,
      updateData,
      auth,
    };
  },
  data() {
    const open = () => {
      const myModal = new Modal(document.getElementById("staticBackdrop"), {});
      myModal.show();

      // setTimeout(() => {
      //   myModal.hide();
      // }, 3000);
    };

    // const openDropdown = () => {
    //   // GET STATUS DROPDOWN. IS OPEN OR CLOSE
    //   const status = document.getElementById("top-dropdown")?.ariaExpanded;

    //   if (status === "false") {
    //     // SET CLASS CONTAINER DROPDOWN TO OPEN
    //     document.getElementById("top-dropdown")?.classList.add("show");
    //     document
    //       .getElementById("top-dropdown")
    //       ?.setAttribute("aria-expanded", "true");

    //     // SET CLASS DROPDOWN MENU TO OPEN
    //     document.getElementById("dropdown-menu")?.classList.add("show");
    //     document
    //       .getElementById("dropdown-menu")
    //       ?.classList.add("open-dropdown");
    //   } else {
    //     // SET CLASS CONTAINER DROPDOWN TO CLOSE
    //     document.getElementById("top-dropdown")?.classList.remove("show");
    //     document
    //       .getElementById("top-dropdown")
    //       ?.setAttribute("aria-expanded", "false");

    //     // SET CLASS DROPDOWN MENU TO CLOSE
    //     document.getElementById("dropdown-menu")?.classList.remove("show");
    //     document
    //       .getElementById("dropdown-menu")
    //       ?.classList.remove("open-dropdown");
    //   }
    // };

    return {
      open,
      mySVG: require("../assets/error.svg"),
      // openDropdown,
    };
  },
};
</script>

<style>
.open-dropdown {
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: translate(0px, 40px);
}
.btn-dropdown-custom:active {
  border: none;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
}
</style>