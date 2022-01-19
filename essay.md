<h1 style="text-align: center">Essay</h1>

## Responsive UI

For responsive UI's, it is important to take advantage of flexbox when laying out your components on the screen. Rather than specifying the width, or height of each component, you can specify the flex property of each component and also use the spacings around it (margin) or spacing within (padding) to achieve the desired layout. Although, depending on their role there are some components that require you to constrain it's width or height to specific values.

With that in mind, it is also important to have unified design system (which includes spacings, typography, colors, etc.) across all of your components. So there are no **"magic values"** when styling your components. As seen in the [source code](https://github.com/BalogunofAfrica/pet_directory_app/blob/master/constants/Spacing.ts "spacing") for the challenge, all spacings have been set according to the design system in the figma file.

Also setting breakpoints based on width/height of device can help you to make your design more responsive. We might have breakpoints for small phone, tablet, and large phone. This will help you to make your design more flexible and adaptable to different devices, for example we might want to layout our components in a column for tablets and rows on phones. [Shopify's restyle](https://github.com/Shopify/restyle#responsive-values "restyle") library is a great tool to help with enforcing this.

## State Management

For client state management, we can use the [useState](https://reactjs.org/docs/hooks-state.html "useState") hook for states that are local to a component/screen, and for state that are shared across components/screens, we can use the [Redux Toolkit](https://redux-toolkit.js.org/ "Redux") library or [Zustand](https://docs.pmnd.rs/zustand/introduction "Zustand") library. I prefer using Zustand because it is a lot easier to use and keep track of your state logic with less boilerplate code.

For server state management, we can use the [React Query](https://react-query.tanstack.com/ "react query") library. This is a great tool that can handle both **REST** and **GraphQL** requests, and comes with client side persistence of server state out of the box.
The great thing about this library is that we can specify the `staleTime` for the data we recieve, and it will automatically make a fresh request for new data when the stale time is reached.

We can also specify `cacheTime` if we do not want unused/inactive persisted data to remain in memory. The data is garbage collected after the cache time is reached.

## Performance Optimization

For an app like Backdrop which uses a lot of Images hence Image components, the images passed to the Image component should be of the same size as the container that they are to fill. This is because images are handled by the native side which has to do the resize on the images which is an expensive operation (especially for iOS), and all of this operation has to cross the JS bridge which is asynchronous can make the images load slowly.

Also perfer vector images to png images with scale values (@2x, @3x, etc.) as it is faster to render and load.

For large lists it is best to use the inbuilt FlastList which lazy loads it's children giving a bettter scroll performance.

Choose third party libraries wisely. They add to the bundle size and they can also hamper your app's performance as they all have to be loaded on startup. For example, instead of using the whole lodash library, you can implement the essentials you need yourself.

Use hermes for android to reduce app startup time and also better performance as your bundle would be compiled to bytecode.

Always animate at 60fps. Optimize your animations by constructing them using the [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/ "Reanimated") library, or using Lottie animations files.
