import React from 'react';
import Link from 'next/link';
import { Global, css } from '@emotion/core';
import Head from 'next/head';

// Components 
import Header from './Header';

const Layout = (props) => {
	return ( 

		<>
		<Global 
			styles = {css`
				:root {
					--gris: #3d3d3d;
					--gris2: #6F6F6F;
					--gris3: #E1E1E1;
					--naranja: #DA552F;
				}

				html {
					font-size: 62.5%;
					box-sizing: border-box;
				}

				*, *:before, *:after {
					box-sizing: inherit;
				} 

				body {
					font-size: 1.6rem; 
					line-height: 1.5;
				}

				h1,h2,h3 {
					margin: 0 0 2rem 0;
					line-height:1.5;
				}

				h1, h2 {
					font-family: 'Roboto Slab', serif;
				}

				h3 {
					font-family: 'PT Sans', sans-serif;
				}

				ul {
					list-style: none;
					margin: 0;
					padding: 0;
				}

				a {
					text-decoration: none;
				}
			`}
		/>

		<Head>
			<meta lang = "es"/>
			<title>Product Hunt con Firebase y Next</title>
		
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />
			<link href="https://fonts.googleapis.com/css?family=PT+Sans|Roboto+Slab:400,700&display=swap" rel="stylesheet" />

		</Head>

		<Header />

		<main>
			
			{props.children}

		</main>

		</>
)};


export default Layout;