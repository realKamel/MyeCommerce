import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
	provideRouter,
	RouterModule,
	withHashLocation,
	withInMemoryScrolling,
} from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: "top",
			}),
			withHashLocation()
		),
		provideClientHydration(),
		provideHttpClient(withFetch()),
		provideAnimations(),
		importProvidersFrom(NgbModule, RouterModule),
	],
};
