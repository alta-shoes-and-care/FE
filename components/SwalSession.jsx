import Swal from 'sweetalert2';

export default function SwalSession() {
	Swal.fire({
		title: 'Your session has ended!',
		text: 'Please login again to continue.',
		icon: 'error',
		showCancelButton: false,
		confirmButtonColor: '#175c8c',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Ok',
	}).then((result) => {
		if (result.isConfirmed) {
			router.push('/login');
			localStorage.clear();
		}
	});
}
