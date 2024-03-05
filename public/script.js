document.querySelector(".e-e").addEventListener("click", function () {
  alert("You found me!🎉 I'm an easter egg! 🥚");
});

const card = document.getElementById("cardImg");
card.onload = function () {
  const height = card.clientHeight;
  const width = card.clientWidth;

  card.addEventListener("mousemove", (e) => {
    const { layerX, layerY } = e;

    const yRotation = ((layerX - width / 2) / width) * 20;

    const xRotation = ((layerY - height / 2) / height) * 20;

    const string = `perspective(500px) scale(1.08) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    card.style.transform = string;
  });
};

card.addEventListener("mouseout", () => {
  card.style.transform = `perspective(500px) scale(1) rotateX(0) rotateY(0)`;
});
