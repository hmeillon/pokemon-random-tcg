//Easter Egg made for the heart inside the footer.
document.querySelector(".e-e").addEventListener("click", function () {
  alert("You found me!🎉 I'm an easter egg! 🥚");
});

//Targeting the image of the card that is rendered in the webpage.
const card = document.getElementById("cardImg");

//Created a function that will be executed ONCE the card is fully loaded inside the webpage. This will handle the event when the mouse is hovering the card image and making it interactive.
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

//Once the mouse is out from the image, it will reset.
card.addEventListener("mouseout", () => {
  card.style.transform = `perspective(500px) scale(1) rotateX(0) rotateY(0)`;
});
