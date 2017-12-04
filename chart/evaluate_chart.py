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


def standardizedTxt(str):
    return str.lower().strip().replace(" ", "")


def sameArray(a1, a2):
    """
    :return: True if they are the same, False otherwise
    """
    if len(a1) != len(a2): return False

    for (e1,e2) in zip(a1,a2):
        if e1 != e2:
            return False
    return True


def sameDic(d1,d2):
    """
    :param d1: a dictionary where key are str
    :param d2: a dictionary where key are str
    :return: True if they are the same (the key are normalize for testing), False otherwise
    """
    if len(d1) != len(d2): return False

    for (k1,k2) in zip(d1,d2):
        if standardizedTxt(k1) != standardizedTxt(k2):
            return False
        if d1[k1] != d2[k2]:
            return False


def evaluate_chart(question, response):
    """
    :param question: a Question object
    :param response: The response to assess
    :return: 1 if the response is correct, 0 if incorrect, -1 if automatic evaluation is impossible
    """
    try:
        raw_correct_answers = question.get_answer()
        evaluation_type = raw_correct_answers["type"]
        list_raw_correct_answers = raw_correct_answers['answers']
        #answer_json = json.loads(raw_correct_answers['answers'][0]['chart'])

        if evaluation_type == "chart-barchart":
            student_answers = []
            for x in response[0].decode('utf-8').split(','):
                student_answers.append(int(x))
            # raise Exception('response len ='+str(len(response))+'  '+str(response))
            for answer_str in list_raw_correct_answers:
                answer_json = json.loads(str(answer_str['chart']))
                correct_answer = answer_json['point']
                if sameArray(correct_answer, student_answers):
                    return 1
            return 0
        # elif evaluation_type == "chart-piechart":
        #     #Assuming answer are in a dic key are sectorname and value are sector size
        #     student_answers = {}
        #
        #     student_answers = sorted(student_answers.items(), key=lambda x: (x[1],x[0]),reverse=True)
        #     for answer_str in list_raw_correct_answers:
        #         answer_json = json.load(answer_str)
        #         correct_answer = sorted(answer_json['point'].items(), key=lambda x: (x[1],x[0]),reverse=True)
        #
        #         raise Exception('Need more information')
        #         if sameDic(correct_answer, student_answers):
        #             return 1
        #     return 0
        else:
            return -1
    except ValueError:
        return -1
