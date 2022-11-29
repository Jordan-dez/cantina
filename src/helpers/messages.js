import Swal from 'sweetalert2'

// pop-up de message d'information
export const infoMessage = (message) => {
    Swal.fire({
    icon: 'info',
    text: message,
    confirmButtonColor: '#3085d6',
    })
}

// pop-up de message de succes
export const successMessage = (message) => {
    Swal.fire({
    icon: 'success',
    text: message,
    confirmButtonColor: '#3085d6',
    })
}

// pop-up de message d'avertissement
export const warningMessage = (message) => {
    Swal.fire({
    icon: 'warning',
    text: message,
    confirmButtonColor: '#3085d6',
    })
}