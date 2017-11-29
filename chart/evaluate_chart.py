# encoding: utf-8

from __future__ import unicode_literals
from django.db import models
from django.contrib.postgres.fields import JSONField
from datetime import datetime
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import yaml
import yamlordereddictloader
import json
import re


def evaluate_chart(question, response):
    '''
    :param question: a Question object
    :param response: The response to assess
    :return: 1 if the response is correct, 0 if incorrect, -1 if automatic evaluation is impossible
    '''
    raw_correct_answers = question.get_answer()
    evaluation_type = raw_correct_answers["type"]
    answer_json = json.loads(raw_correct_answers['answers'][0]['chart'])


    if evaluation_type == "chart-barchart":
        student_answers = []
        for x in response[0].decode('utf-8').split(','):
            student_answers.append(int(x))
        correct_answers = answer_json['point']
        if len(student_answers) != len(correct_answers):
            return 0
        score = 0
        for (student_answer, correct_answer) in zip(student_answers,correct_answers):
            if student_answer == correct_answer:
                score += 1
        # raise Exception('1' if score == len(correct_answers) else '0')
        return 1 if score == len(correct_answers) else 0
    else:
        return 1
