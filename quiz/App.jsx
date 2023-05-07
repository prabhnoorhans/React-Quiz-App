import { useState, useEffect } from 'react'
import Question from "./Question"
import { nanoid } from 'nanoid'
import './App.css'

function App() {
	const [scene, setScene] = useState(true) // false after
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)

	useEffect(() => {
		async function getData() {
			const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
			const data = await res.json()
			data.results.map(prevData => prevData.id = nanoid())
			data.results.map(prevData => {
				let choices = [prevData.correct_answer, ...prevData.incorrect_answers]
				
				choices = choices.map(prevOption => {
					return {value: prevOption, selected: false, checkClass: ""}
				})

				choices = choices.sort(() => Math.random() - 0.5)
				prevData.choices = choices
			})

			// setData([data.results[0]]) // test one
			setData(data.results) // right one
		}
		getData()
	}, [])

	function changeScene() {
		setScene(true)
	}

	function onAnswerChosen(event) {
		let ans = event.target.value;
		let qid = event.target.getAttribute("data-qid")

		setData(data.map(prevData => {
			if (prevData.id === qid) {
				prevData.choices.map(prevChoices => {
					prevChoices.selected = false
				})
			}
			return prevData
		}))
		
		setData(data.map(prev => {
			if (prev.id == qid) {
				prev.choices.map(x => {
					if (x.value == ans) {
						x.selected = true
					}
				})
			}
			return prev
		}))
	}

	const questions = data.map(item => {
		const id = item.id

		return (
			<Question
				key={id}
				id={id}
				onAnswerChosen={onAnswerChosen}
				{...item}
			/>
		)
	})

	function checkAnswers(e) {
		e.preventDefault();

		let count = 0;

		for (let x in data) {
			// set checkClass to ""
			const tempID = data[x].id
			setData(data.map(prevData => {
				if (prevData.id === tempID) {
					prevData.choices.map(prevChoices => {
						prevChoices.checkClass = ""
					})
				}
				return prevData
			}))

			const selectedIndex = data[x]["choices"].findIndex(a => a.selected === true)
			if (selectedIndex >= 0) {
				if (data[x].correct_answer === data[x]["choices"][selectedIndex].value) {
					data[x]["choices"][selectedIndex].checkClass = "correct"
					count++
				} else {
					data[x]["choices"][selectedIndex].checkClass = "incorrect"
				}
			}
		}

		setCount(count)

	}

	return (
		scene
		?
		<>
			<form>
				{questions}
				<button type="submit" onClick={checkAnswers}>Check Answers</button>
			</form>
			<p>{count}</p>
		</>
		:
		<main>
			<h1>Quizzical</h1>
			<h5>Test your knowledge</h5>
			<button onClick={changeScene}>Start Quiz</button>
		</main>
	)
}

export default App