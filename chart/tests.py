#!/usr/bin/env python3
# coding: utf-8

# Add your tests in this file
# pyhamcrest has to be installed
# doc: http://pyhamcrest.readthedocs.io/en/release-1.8/tutorial/

import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from .evaluate_chart import evaluate_chart
from examinations.models import Question
from django.test import TestCase


class TeacherSide(unittest.TestCase):

	def setUp(self):
		self.driver = webdriver.Firefox()
		driver = self.driver
		driver.get("http://127.0.01:8000")
		wait = WebDriverWait(driver, 10)
		#assert "No results found." not in driver.page_source

	def tearDown(self):
		self.driver.close()


class CorrectionChartExercices(TestCase):
    def setUp(self):
        commonQparts = ["type: ","""\nanswers:\n- chart: '{"point":""",
						""","AxisX":"abscisses","AxisY":"ordonnees","zeroX":-1,"zeroY":-1,"maxX":10,"maxY":10}'"""]
        setOfTest = [['Q0','chart-barchart', '[1,1,1,2]', [u'1,1,2'], 0,'response of different lenght shouldnt be considere as a True answert'],
					 ['Q1','chart-barchart', '[1,1,1,2]', [u'1,1,1,2'], 1,'same answert should be True'],
                     ['Q2','chart-barchart','[2,2,2,2,2]',[u'1,1,2,2,2'],0,'answert different but of same length'],
                     ['Q3','chart-barchart','',[u'1,2,1'],-1,'without true answer, it is impossible to correct']]
        self.studentAnswer = []
        self.output = []
        self.message = []
        for test in setOfTest:
            Question.objects.create(description=test[0],answer=commonQparts[0]+test[1]+commonQparts[1]+test[2]+
                                                               commonQparts[2],source="None",indication=test[1])
            self.studentAnswer.append(test[3])
            self.output.append(test[4])
            self.message.append(test[5])

    def testBarchart(self):
        for i in range(len(self.studentAnswer)):
            Q = Question.objects.get(description='Q'+str(i))
            if Q.indication == "chart-barchart":
                self.assertEqual(evaluate_chart(Q,self.studentAnswer[i]),self.output[i],self.message[i])

    def testPiechart(self):
        for i in range(len(self.studentAnswer)):
            Q = Question.objects.get(description='Q'+str(i))
            if Q.indication == "chart-piechart":
                self.assertEqual(evaluate_chart(Q,self.studentAnswer[i]),self.output[i],self.message[i])

if __name__ == '__main__':
	unittest.main()

