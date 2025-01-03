import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
	BellIcon,
	// CalendarIcon,
	ChartBarIcon,
	// FolderIcon,
	HomeIcon,
	// InboxIcon,
	// UsersIcon,
	MapIcon,
	PhoneIcon,
	XMarkIcon,
	Bars3Icon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const navigation = [
	{ name: 'Dashboard', href: '/home', icon: HomeIcon, current: true },
	// { name: 'Team', href: '#', icon: UsersIcon, current: false },
	// { name: 'Projects', href: '#', icon: FolderIcon, current: false },
	// { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
	// { name: 'Documents', href: '#', icon: InboxIcon, current: false },
	// { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
	{ name: "Devices", href: "/devices", icon: PhoneIcon, current: false },
	{ name: "Map", href: "/map", icon: MapIcon, current: false },
	{ name: "Statistics", href: "/statistics", icon: ChartBarIcon, current: false },
]
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [navItems, setNavItems] = useState(navigation);
	const router = useRouter();

	useEffect(() => {
		const newNavItems = navItems.map((item) => {
			item.current = router.pathname.includes(item.href);
			return item;
		});
		setNavItems(newNavItems);
	}, [router.pathname]);

	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-red-700">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="flex-shrink-0 flex items-center px-4">
									<p
										className="mx-auto text-2xl font-bold text-white"
									>
										<span className="text-red-200">B</span>laze<span className="text-red-200">A</span>lert
									</p>
								</div>
								<div className="mt-5 flex-1 h-0 overflow-y-auto">
									<nav className="px-2 space-y-1">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													item.current ? 'bg-red-800 text-white' : 'text-red-100 hover:bg-red-600',
													'group flex items-center px-2 py-2 text-base font-medium rounded-md'
												)}
											>
												<item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-red-300" aria-hidden="true" />
												{item.name}
											</a>
										))}
									</nav>
								</div>
							</div>
						</Transition.Child>
						<div className="flex-shrink-0 w-14" aria-hidden="true">
							{/* Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 font-sans">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex flex-col flex-grow pt-5 bg-red-700 overflow-y-auto">
						<div className="flex items-center flex-shrink-0 px-4">
							<p
								className="mx-auto text-2xl font-sans font-bold text-white"
							>
								<span className="text-red-300">B</span>laze<span className="text-red-300">A</span>lert
							</p>
						</div>
						<div className="mt-5 flex-1 flex flex-col">
							<nav className="flex-1 px-2 pb-4 space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={classNames(
											item.current ? 'bg-red-800 text-white' : 'text-red-100 hover:bg-red-600',
											'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										)}
									>
										<item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-red-300" aria-hidden="true" />
										{item.name}
									</Link>
								))}
							</nav>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col flex-1 font-sans">
					<div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
						<button
							type="button"
							className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 md:hidden"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
						<div className="flex-1 px-4 flex justify-between">
							<div className="flex-1 flex">
								<form className="w-full flex md:ml-0" action="#" method="GET">
									<label htmlFor="search-field" className="sr-only">
										Search
									</label>
									<div className="relative w-full text-gray-400 focus-within:text-gray-600">
										<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
											<MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
										</div>
										<input
											id="search-field"
											className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
											placeholder="Search"
											type="search"
											name="search"
										/>
									</div>
								</form>
							</div>
							<div className="ml-4 flex items-center md:ml-6">
								<button
									type="button"
									className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									<span className="sr-only">View notifications</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>

								{/* Profile dropdown */}
								<Menu as="div" className="ml-3 relative">
									<div>
										<Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											{userNavigation.map((item) => (
												<Menu.Item key={item.name}>
													{({ active }) => (
														<a
															href={item.href}
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700'
															)}
														>
															{item.name}
														</a>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<main>
						<div className="py-6">
							{/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								<h1 className="text-2xl font-semibold text-gray-900">
									{navItems.find((item) => item.current)?.name}
								</h1>
							</div> */}
							<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
								{/* Replace with your content */}
								{/* <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div> */}
								{/* /End replace */}
								{children}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
