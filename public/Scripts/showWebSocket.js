const socket = io(window.location.origin);

const showToaster = (answer) => {
  toastr.options.closeButton = true;
  toastr.options.positionClass = 'toast-absolute toast-bottom-right';
  toastr.info(
    `Акция "${answer.name}" начинает действовать сейчас`,
    'New special offer',
  );
};

socket.on('newSpecialOffer', (answer) => {
  showToaster(answer);
});
