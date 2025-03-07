import Link from 'next/link';

export const metadata = {
	title: 'HarperDB - Next.js App',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body style={{ width: '500px', fontFamily: 'sans-serif' }}>
				<header>
					<nav>
						<ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<Link href="/marbles">Blue Marbles</Link>
							</li>
						</ul>
					</nav>
				</header>
				<main>
					<section style={{ borderBottom: '1px solid' }}>
						<p>Based on the <a href="https://github.com/HarperDB/nextjs-example">HarperDB Next.js Example Application</a></p>
					</section>
					{children}
				</main>
			</body>
		</html>
	);
}