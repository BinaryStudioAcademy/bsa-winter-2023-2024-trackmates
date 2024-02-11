import "./styles.css";

type Properties = {
	className?: string;
	isPrimary?: boolean;
	label: string;
	type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
	className,
	isPrimary = false,
	label,
	type = "button",
}: Properties) => {
	const buttonClasses = ["button", isPrimary && "primary", className]
		.filter(Boolean)
		.join(" ");

	return (
		<button className={buttonClasses} type={type}>
			{label}
		</button>
	);
};

export { Button };
