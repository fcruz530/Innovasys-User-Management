import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

export function usersFormGroup() {
  const formBuilder = inject(NonNullableFormBuilder);

  return formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: [''],
    status: ['active'],
  });
}
