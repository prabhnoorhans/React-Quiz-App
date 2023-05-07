import React from "react"

function Question(props) {
	return (
		<div className="question-box">
			<h3>{props.question}</h3>
			
			{/* [Test Mode] */} {/*<h6>{props.correct_answer}</h6>*/} {/* [Test Mode] */}

			<div className={props.choices[0]["checkClass"]} >
				<input
					type="radio"
					data-qid={props.id}
					id={`"${props.id}-radio_0"`}
					name={`"${props.id}-radio"`}
					value={props.choices[0]["value"]}
					onChange={props.onAnswerChosen}
				/>
				<label htmlFor={`"${props.id}-radio_0"`} >{props.choices[0]["value"]}</label>
			</div>

			<div className={props.choices[1]["checkClass"]} >
				<input
					type="radio"
					data-qid={props.id}
					id={`"${props.id}-radio_1"`}
					name={`"${props.id}-radio"`}
					value={props.choices[1]["value"]}
					onChange={props.onAnswerChosen}
				/>
				<label htmlFor={`"${props.id}-radio_1"`} >{props.choices[1]["value"]}</label>
			</div>

			<div className={props.choices[2]["checkClass"]} >
				<input
					type="radio"
					data-qid={props.id}
					id={`"${props.id}-radio_2"`}
					name={`"${props.id}-radio"`}
					value={props.choices[2]["value"]}
					onChange={props.onAnswerChosen}
				/>
				<label htmlFor={`"${props.id}-radio_2"`} >{props.choices[2]["value"]}</label>
			</div>
			
			<div className={props.choices[3]["checkClass"]} >
				<input
					type="radio"
					data-qid={props.id}
					id={`"${props.id}-radio_3"`}
					name={`"${props.id}-radio"`}
					value={props.choices[3]["value"]}
					onChange={props.onAnswerChosen}
				/>
				<label htmlFor={`"${props.id}-radio_3"`} >{props.choices[3]["value"]}</label>
			</div>
		</div>
	)
}

export default Question;