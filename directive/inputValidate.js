export default (Vue)=>{
  const regx = {
    'digit':/\D/g,
    'digitAndPoint':/[^\d.]/g
  }
  Vue.directive("restrict", {
    bind(el, binding) {
      const target =
        el instanceof HTMLInputElement ? el : el.querySelector("input");
      target.addEventListener("keyup", e => {
          // Regex check
          //console.info("argument:"+binding.arg);
           let type = binding.arg;
           console.log(type);
           var reg = regx[type];

          if (reg.test(binding.value)) {
            e.target.value = e.target.value.replace(reg, "");

            e.target.dispatchEvent(new Event("input"));//调用input事件使vue v-model绑定更新,下面相同
          }

      });
      // target.addEventListener("paste", e => {
      //   if (binding.value) {
      //     // Regex check
      //     if (binding.value.test(e.target.value)) {
      //       e.target.value = e.target.value.replace(binding.value, "");
      //       e.target.dispatchEvent(new Event("input"));
      //     }
      //   }
      // });
      // target.addEventListener("keyup", e => {
      //   if (binding.value) {
      //     // Regex check
      //     if (binding.value.test(e.target.value)) {
      //       e.target.value = e.target.value.replace(binding.value, "");
      //       e.target.dispatchEvent(new Event("input"));
      //     }
      //   }
      // });
    } // end bind
  }); // end directive
}

